---
author: rubydoobiedoo
comments: true
date: 2016-03-17 21:31:16+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/03/17/review-web-app-in-rails-and-the-abyss/
slug: review-web-app-in-rails-and-the-abyss
title: Review Web App in Rails and THE ABYSS
wordpress_id: 358
---

The beauty of rails is it _can be_ incredibly straightforward and simplistic, with all the functions that you require out of a powerful web application. Authentification? The [devise gem](https://github.com/plataformatec/devise) is at your beck and call. Authorization? [Pundit](https://github.com/elabs/pundit) or [CanCanCan](https://github.com/CanCanCommunity/cancancan) will keep those policy scope methods nice and tidy. You want a pretty front-end? [Bootstra](http://getbootstrap.com)ps got you covered. Anything else that you might hate doing by hand? Rails can generate it. There are thousands of features that are all available at a click of the mouse....and that's what makes Rails difficult, not stating what you need, or asking then asking the questions on how to do something, but the unnerving search through the depth of answers for the solution that best fits the scenario. ![giphy](https://rubydoobiedoo.files.wordpress.com/2016/03/giphy.gif)Having run into this a lot during programming I've begun calling this depth of programming knowledge "ABYSS" or

Absolutely

Beyond

Your

Shit

Solutions.

I built out a review site with a simple bootstrap front-end where you can rate and comment on the Flatiron School's  Learn-Verified Full Stack Web Development Course and then allows users to rate the lessons in difficulty as well as add comments to each lesson that can then be viewed by visitors and users.

If you'd like to follow along with my project the repo can be found [here](https://github.com/pajamaw/lv_lesson_review).

The walkthrough:

The greatest obstacle I run into with rails is getting lost in the ABYSS (the same issue I brought up earlier)

.![giphy (1)](https://rubydoobiedoo.files.wordpress.com/2016/03/giphy-1.gif)

There are SO MANY GODDAMN ways to answer a question. I've lost friends and family to the ABYSS after they stumbled into stackoverflow forums looking for  the correct form_tag to use. Because of the ABYSS, the first step in any project, is to create a workflow. I can't get over how extremely important this is if you'd like to maintain your sanity and prevent getting lost in the ABYSS along the way.

There are several ways to setup a workflow. The best way, imho, is through TDD or BDD depending on what you're used to. I'm talking about using testing suites like  cucumber, selenium, capybara, rspec, or the dozens of others that force you to sit down and write down what you want, then write down what you require to get there, so that you can then create it this allows you to navigate the abyss if you need an answer, solve the problem and then most importantly, _ move on_.

Despite my belief in testing, I chose what I believe is the second best method (which resulted in the project taking longer than I expected),  s0 I wrote a list in the following fashion.

WHAT AM I BUILDING HERE:

you're building a review application for the Learn Verified courses, pj.

WHAT DO I NEED

Statement: The lessons, there are literally hundreds of them that I'm not manually putting in by hand

Question: Well how do i scrape it then?

Answer: build out a Scraper, then scrape that DATA.

I used the mechanize gem on the which uses  Nokogiri and URI to open and parse web pages, with some added features, such as the ability to fill out forms, click buttons and more! After i found my desired page with its css tags I made the following

[code language="ruby"]
def agent
agent = Mechanize.new
end

def get_page
page = agent.get('http://www.learn.co/pajamaw.html')
end

def lesson_titles
page.search(&amp;amp;amp;quot;.lesson td span&amp;amp;amp;quot;).collect{|title| title.text}
end
[/code]

which allowed for me to grab all of the lesson titles here.

S. There needs to be organization among those lists,

Q. How do I organize it?

A. build it out so that you scrape the categories as well. I used Mechanize for the webpage parsing and the IRB to find the right selections then created the following.

To do this I had to change my outlook from getting a bunch of individual lessons, to I need to get a each category, with all of its lessons.

[code language="ruby"]

def get_info_blocks
info = get_page.search('div[data-topic-slug]')
end

def get_category_and_lesson_titles
get_info_blocks.each do |lesson_block|
if lesson_block.css('div div h3').text != &amp;amp;amp;quot;&amp;amp;amp;quot;
@category = Category.new(title: lesson_block.css('div div h3').text)
lesson_block.css('tr.lesson').each do |lesson|
@lesson = Lesson.new(title: lesson.text)
@lesson.category_id = @category.id
@category.lessons &amp;amp;amp;lt;&amp;amp;amp;lt; @lesson
@category.save
@lesson.save
end
end
end

[/code]

Nice I've got the data! We'll hold on to that for later now.

S. I need users.

Q. How do I make users?

A. [Devise](https://github.com/plataformatec/devise), Baby!

After you throw in the devise gem into your gemfile and bundle install, devise will set EVERYTHING UP FOR YOU. i shit you not. type in 'rails g devise:install' and then follow the prompt for the whatever else you want to setup through it. it's magic.

S. I need users to have comments and ratings and I need categories which will have lessons, which I want nested to also have those same comments and ratings.

Q. How do I create all these models and their controllers ?

A. You just do.

Literally though. for this just start putting down some 'rails g' actions. Whichever ones you prefer to generate the necessary components. I personally go for the 'rails g resource' generators because it creates your migration files, your models, and your users, without adding any unnecessary crud actions and routes that you might not use, as well as setting up a blanket resources: "class" route. then setup your associations. as opposed to my [Sinatra Project](https://rubydoobiedoo.wordpress.com/2016/03/02/pedigree-sinatra-ar-mvc-app/) where I was using self-joins and lots of other fun stuff, this time we had our basic belongs_to and has_many relationships.  User has_many comments and ratings. Categories has many Lessons and has many ratings and comments through lessons. Ratings and comments both belongs_to a lesson and a user. I setup all of my foreign_key relationships (all of the models with belongs to gets a foreign key!) I migrated.

S. This is essentially a site for LV students right? I need authentification to ensure that people from LV can come in to become users, while others cannot, I also need to make sure that the users dont screw with other  users things.

Q. How can i ensure that LV are the only ones, and also make sure every user keeps his hands to himself?

A. well can't make them login with their LV credentials (actually i could if i used the student scraper from my [karma project](https://rubydoobiedoo.wordpress.com/2016/02/13/my-first-gem/) and then students would authenticate with omniauth but every github authentification had a final check to make sure they were also a stud...AHHH NICE TRY, ABYSS) but i can make sure they at least have a github account so github-omniauth for verification. While I can use pundit for to make sure that user's don't play with others things.

Omniauth is literally just magic. I've used the Facebook Omniauth and the Github omniauth and I found the github one much less buggy, may have just been lucky chance though. **[https://www.codementor.io/ruby-on-rails/tutorial/rails-omniauth-with-devise--github-example](https://www.codementor.io/ruby-on-rails/tutorial/rails-omniauth-with-devise--github-example) **I followed this guide to a T. As for ensuring everyone keeps their hands off of each other's belongings I setup 

[code language="ruby"]

 private
#app/controllers/application_controller.rb

 def user_not_authorized
 flash[:alert] = "You are not authorized to perform this action."
 redirect_to root_path
 end

 def require_login
 unless logged_in?
 flash[:alert] = "You must be logged in to access this section"
 redirect_to new_user_session_path 
 end
 end

 def logged_in?
 !!current_user
 end

end

[/code]



I use the #user_not_authorized to create a custom error which rescues a user from breaking the program and submits an error to the window and redirects them when they access something they don't have permissions to. These policies are included by including Pundit. Pundit authorizations are stored in my policies folder, which compartmentalizes all of my authorization models and methods for users. This prevent users from touching objects that don't include their own user.id., unless they have special privileges due to their role that I accounted for in my other policy files (we'll get to those soon). The #require_login method, I then use through before_filter :require_login in my different controller methods where I first want to ensure that all visitors of the site are users, offering a distinct error from when users are not authorized to view or commit certain actions.



S. KK I've got that data about the categories and the lessons but i need to port it into the database now.

Q. How do I port it into the database? Should I hop aboard the one-by-one form_train?

A. NOPE GET OFF THE FORM TRAIN. Build that DATA into a class, with methods that instantiate each Lesson and their categories, and then a method that runs all of the processes. Call that class in your db/seeds.db file. then rake commands baby!

I've never built out a seed data like this before and it was surprisingly difficult to find a forum online that explained it out. So I just assumed it would work out if i called a new scraper instantiation and called run on it...which it did! I took those methods that we looked at earlier and bundled them in a #run method

[code language="ruby"]
def run
get_page
get_info_blocks
get_category_and_lesson_titles
end
[/code]

Then put in LessonsScraper.new.run into my seeds file and ran it through the rake command rake db:seed. Presto. had my categories and lessons all ported in with automatic relationships established.

S. wait those titles have a bunch of junk data i dont need like time completed and stuff.

Q: I need to parse the titles to standardize their actual names, should I do that now or later?

A. LATER CUZ PROCRASTINATION. That's not actually the reason but do it later. As of now we'll get by with the names, but the time data could be important in the future so we don't need to delete it from the records just yet. But yes, create a parse_title class method for the Lesson class.

Knowing that some of the titles had the amount of time it took to complete them and others had dashes at the end instead, I setup this blanket parsing instance method using regex that wouldn't change the database entry in case I wanted that information for another project

[code language="ruby"]

def parse_title
#if title.match(/(\-)/)
#title = self.title.gsub(&amp;amp;amp;quot;-&amp;amp;amp;quot;, &amp;amp;amp;quot;&amp;amp;amp;quot;)######(/^[\w+\s+\w]*/)
if title.match(/(\d)/) || title.match(/(-)/)
title.gsub(&amp;amp;amp;quot;-&amp;amp;amp;quot;, &amp;amp;amp;quot;&amp;amp;amp;quot;).match(/^\D+/)
##not going to change titles until i know what information i want
##on here
else
title
end
end

[/code]

S. all comments in a place looks fine, but all ratings look weird together

Q. How should I group ratings?

A. an instance method that will get you the average rating!

I put #average_rating in two different models both Category and Lesson, which works due to their has_many relationship with comments.

[code language="ruby"]

 def average_rating
 if ratings.count != 0
 average = 0
 total = 0
 ratings.each do |num|
 total += num.star_rating.to_f
 end
 average = total / ratings.count
 else
 "N/A"
 end
 end

[/code]

Further more to find the most difficult category and lesson I created class methods .hardest_category and .hardest_lesson, then built out a route to the show route, which only renders the selected lesson. You can see below how in the query method i first create a new array filled with all the different category objects, then I select all the categories that have ratings, and place them into a new array, rated_categories. Afterwords I sort rated_categories by their average_rating and call the first object. Replace category with lesson, and there is my hardest_lesson method!

[code language="ruby"]

def self.hardest_category
 all_categories = Category.all
 rated_categories = all_categories.select do |category|
 category.ratings.count != 0
 end

 rated_categories.sort{|category| category.average_rating}.first
 end
end
<pre>[/code]

S. I want god like powers over my rails domain, but make sure no one else can.

Q: How do I become a god?

A. enum role[:user, :vip, :admin] add a column migration to the users :role as integer and then add enum role [whatever ] to your user model class. default in the migration whatever you want your default to be. then set yourself using rails console or build out a view that allows any user to make themselves a higher power.

I didn't want to make normal users able to set themselves as gods _right off  the sign up_ so I made it that only those that sign in through github are admins.

S. with these god like powers i now need to see my subjects

Q. How do i become omniscient?

A: We haven't built out a user's controller due to devise taking care of all the routing. But now let's create one so that we can make a user index page that only admin's can access. We can use Pundit, to ensure that anyone can see their own or other people profiles  only admin's have access to the index all with the ability to eliminate each one of them.

[Pundit's](https://github.com/elabs/pundit) a fantastic tool, I still have yet to get the complete hang of it though. Here I've used it to prevent users from modifying other user's comments and ratings, unless they are VIPS, in which they can delete others ratings and comments, or they're admins which means they can edit and/or delete both user profiles and their comments and ratings. I used a simple conditional verifying that it was the admin? or redirecting them back to the referrer. These policies are outlined in my policies folder and all inherit from the default application_policy.rb

[code language="ruby"]

class ApplicationPolicy
attr_reader :user, :record

def initialize(user, record)
@user = user
@record = record
end

def index?
false
end

def show?
scope.where(:id => record.id).exists?
end

def create?
false
end

def new?
create?
end

def update?
false
end

def edit?
update?
end

def destroy?
false
end

def scope
Pundit.policy_scope!(user, record.class)
end

class Scope
attr_reader :user, :scope

def initialize(user, scope)
@user = user
@scope = scope
end

def resolve
scope
end
end
end

[/code]

the attribute user, refers to #current_user  and record refers to whatever object the current_user is interacting with.

[code language="ruby"]

class CommentPolicy <ApplicationPolicy
attr_reader :user, :record

def create?
user
end

def update?
user.admin? or record.user_id == user.id
end

def destroy?
user.admin? or user.vip? or record.user_id == user.id
end
end

[/code]

The comment policy and rating policies are the same, so to review them you can see, that any user can create a comment, yet only admins or the current users, whose id matches the records(which in this case refers to comment)'s foreign key user_id.

[code language="ruby"]

class UserPolicy < ApplicationPolicy
attr_reader :user, :record

def index?
user.admin?
end

def promote?
user.admin?
end

def show?
user.admin? or user.vip? or record.id == user.id
end

def destroy?
user.admin? or record.id == user.id
end
end

[/code]

Our user_policy.rb goes a step farther, and makes it that only admins can see a full user list via the index page or promote/demote users. To fully use these policies the only other thing that I need to ensure is to add

authorize @record (where record is the instance under question) after the controller methods that respond to the policy methods for pundit to authorize the user.

S. people won't think its impressive unless it looks cool, it needs to look cool

Q. How do i become cool .

answer: add some bootstrap to that DATA! fixed navbar always looks nice. as well as some dynamic links that appear if you're logged in or if you're the admin

There are enough forums online on bootstrap that sped me through this process that are shallow enough not to get sucked in. I tidied things up and added a drop down menu. Nothing too nice, but added the requirements to continue prettifying it. I followed this post pretty closely to guide my way through adding an easy fixed-navbar https://www.rubyplus.com/articles/1371.



Granted, I was not this organized and I fell deep into the ABYSS this round (if you'd like to see my [journey](https://rubydoobiedoo.wordpress.com/2016/03/17/my-initial-road-map-for-rails/) and type in "ABYSS"). BUT, that's what makes this all so interesting. the realm of possibilities. The ABYSS isn't an enemy nor is it a friend. It's a force of nature that must be treated with respect and treaded carefully. You can always wander in, and you'll need to venture in during most likely every single project you commit. Anything can be done with Rails, and all of the solutions are there at your finger tips. But unless your just going spelunking I recommend you make a roadmap before you start your next trip.

![giphy (2)](https://rubydoobiedoo.files.wordpress.com/2016/03/giphy-2.gif)
