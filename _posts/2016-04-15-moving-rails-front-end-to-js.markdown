---
author: rubydoobiedoo
comments: true
date: 2016-04-15 00:15:44+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/04/15/moving-rails-front-end-to-js/
slug: moving-rails-front-end-to-js
title: Moving Rails Front End to JS
wordpress_id: 767
---

If you wouldn't like a 2000 word read feel free to check out my [youtube](https://youtu.be/AgGvTryKd_Q) walkthrough on it!

This project of mine entailed moving my [lv lesson review project ](https://rubydoobiedoo.wordpress.com/2016/03/17/review-web-app-in-rails-and-the-abyss/)'s front-end ruby framework into javascript.

So where as the server-side database management would still be in Ruby using the Rails framework, the backend instead of sending ruby objects will now send javascript objects through JSON. Creating an API thats rendered instantaneously in the view.

When I was trying to figure out how to exactly begin this project, I was pretty stumped. Surprisingly, I couldn't find a lot of resources online that would explain the simple question of "How do I begin transitioning a rails app to using JSON?"

Everything I found online was written with the agenda of pushing a particular JS framework, whether it be, React.js, Node.js, Angular.js, or a number of others.

So if you've found yourself in a similar situation CONGRATULATIONS. I'm going to try and guide you through my methodology and explain it in a better way than I found it.

So to begin I began with my [lv lesson review rails project](https://github.com/pajamaw/lv_lesson_review) which you can follow along with (it will either be using the master branch or a new ruby only branch if I've decided to merge my jsrails branch which is where I added the JS).

So first things first. What do we have to do?

Well I have 5 object models, users, categories, lessons, comments, and ratings.

Of these 5, we'll worry about the last 4 of them since our goal for this project will be the following:



	
  1. Make the Lesson directory more manageable.

	
  2. Translate the necessary objects into JSON

	
  3. Have the ratings show and update on the Lesson page without a refresh

	
  4. Have a lesson's comments show and instantly update on the Lesson page without a refresh

	
  5. Have the lesson title show

	
  6. Be able to create new ratings and comments from the lesson show page without a refresh

	
  7. Ensure that the ratings and comments are manageable on the lesson show page.


7 Goals. Not too bad!

So to begin lets deal with the pagination issue and make the Lesson directory a bit more manageable. Now the problem here is that there are 720 lessons. THAT'S A BIT MUCH.

So we should paginate these results to make them a bit more manageable. To do this I used the [kaminari gem](https://github.com/amatsuda/kaminari), this wonderfully powerful gem allows for easy (and most importantly pretty) pagination!

![Region capture 1](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-1.png)

the kaminari gem coems preloaded with tons of methods such as the page_entries_info so it was simple to put in. The window: 2 argument sets the number of pages next to the current page that it will show.

In my LessonsController to finish the job I put in the![Region capture 2](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-2.png)

the order followed by the page parameter which corresponds to the page_entires_info method in the view.

Unfortunately the pagination doesn't naturally keep track of all of the items listed, so if you'd like to list the number entry, without corresponding to the objects id (in this case I'd added more lessons so my lessons were off by a couple thousand :/) So I set a @first variable to the id of the first Lesson - 1, then I would subtract my @first from my current lesson.id to get the correct entry number throughout the different pages! (this would not work if your object's id's are not sequential or if they aren't in the correct order.



	
  1. <del>Make the Lesson directory more manageable.</del>

	
  2. Translate the necessary objects into JSON

	
  3. Have the ratings show and update on the Lesson page without a refresh

	
  4. Have a lesson's comments show and instantly update on the Lesson page without a refresh

	
  5. Have the lesson title show

	
  6. Be able to create new ratings and comments from the lesson show page without a refresh

	
  7. Ensure that the ratings and comments are manageable on the lesson show page.


Sweet! One down, now that are lessons index look pretty, what about turning the objects into JSON?

Well luckily for us, there's another [gem](http://api.rubyonrails.org/classes/ActiveRecord/AttributeMethods/Serialization/ClassMethods.html) that works surprisingly well! Active Model Serializer will turn our objects into JSON quick and easy.

After adding the gem to your gemfile, type in rails g serializer Class_name attribute_name

the gem will automaticaly generate your serializer files and folders through this command. leaving you to create the associations and other attributes. ![Region capture 3](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-3.png)

here you can see the 4 objects that I've turned into serializers. If you're familiar with associations you'll immediately notice that I don't explicitly list a belongs_to relationship in my Comment and Ratings Serializers.

This is because the Universe is utterly uncaring and apathetic to people's suffering.

The AMS gem makes a lot of things easy, but belongs_to associations are not one of them. Currently the AMS gem does not have a belongs_to association method, and due to that there are a myriad of workarounds to allow you to access a comments user object. After searching for far too long. I found the most straightforward method of _simply adding the object as an attribute. _

You will undoubtedly run into 1000 solutions to this, but for my current situation, this worked flawlessly.

Besides that we need to make sure that our controllers our telling our view pages that they're about to get some json so my lessons, ratings, and comments controllers look like the following ![Region capture 5](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-5.png)

[gallery ids="852,853" type="rectangular"]

teh respond_to method is called on by self and then you can call a language argument on them which will accept render parmeters. In each of these you can see that the window will accept html and render the plain ruby @ratings, while when the language is JS it will render the JS form of the object, allowing the view to process both languages!



	
  1. <del>Make the Lesson directory more manageable.</del>

	
  2. <del>Translate the necessary objects into JSON </del>

	
  3. Have the ratings show and update on the Lesson page without a refresh

	
  4. Have a lesson's comments show and instantly update on the Lesson page without a refresh

	
  5. Have the lesson title show

	
  6. Be able to create new ratings and comments from the lesson show page without a refresh

	
  7. Ensure that the ratings and comments are manageable on the lesson show page.


Now for the hard part...

So my page is completely rendered in Ruby, And if this is where you are stuck, my advice is to go ONE by ONE. and not just delete everything you have and start new. You have your controller which renders both, so you don't need to!

So here in my lesson show page, I'm going to put all of my ratings for said lesson. So it will essentially render my index pages for ratings and comments obsolete. This is fine.

We begin by setting our div where our ratings will appear



so now that we have that...lets collect our json objects

![Region capture 9.png](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-9.png)

Going one by one we submit our request to an id we set earlier to teh pathname

window.location.pathname (this grabs the pathname which in our case is lessons/:id)

next we set our response to lesson and begin setting variables to html that we'll insert into our ratingsAll div.

our lessonRatings array uses forEach to iterate through every Rating object and display its attributes in the html.

At the bottom we see where the ratingList which has collected all of the iterated Rating attributes, into the ratingsAll div.

Awesome! That Easy!

our comments array follows the same pattern and then it is all called on in our populateLesson function

![Region capture 10](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-10.png)

this will be inputting the lesson title into the lesson_title div ![Region capture 15.png](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-15.png)

In this function we also call on a parseTitle formatter function which is uses a regex function to remove time data from the title which is ingrained in the object(I've kept it there in case I want to use it in the future) if it exists.

The averageRating function at the bottom( which is also in my populateRatings and populateComments function) replaces my average_rating class method, so that now the average rating of the lesson will change with the addition of new ratings without a page refresh. ![Region capture 12.png](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-12.png)

for the side by side here's how these two methods stack up against each other ![Region capture 13.png](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-13.png)

now lets make sure that these automatically are generated when the page opens....![Region capture 14.png](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-14.png)

and we good!

the document.ready call ensures that when the document is loaded the functions underneath are immediately run.



	
  1. <del>Make the Lesson directory more manageable.</del>

	
  2. <del>Translate the necessary objects into JSON </del>

	
  3. <del>Have the ratings show and update on the Lesson page without a refresh</del>

	
  4. <del>Have a lesson's comments show and instantly update on the Lesson page without a refresh</del>

	
  5. <del>Have the lesson title show</del>

	
  6. Be able to create new ratings and comments from the lesson show page without a refresh

	
  7. Ensure that the ratings and comments are manageable on the lesson show page.


NICE! Knocked out three in one.

So now we have to make sure that the forms post to the correct paths. To do this I changed my form_for forms to form_tag. I did this because I wanted the forms to be used on the same page, so that I could mention them in divs. I'll just use my rating form as an example since my comment form follows a similar pattern

![Region capture 16.png](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-16.png)

I added a custom path, which I then added to my route, to direct the form directly to a post request to my #create action which then redirects to the same lesson. In order to make sure that the page didn't refresh I binded the preventDefault(); function to the submit button. this button also bound the post request that submitted the JSON rating to my database. After the posting response I called teh populateRatings function to update my view allowing the new rating to be present without refreshing the page! (While also updating the average Rating!)



	
  1. <del>Make the Lesson directory more manageable.</del>

	
  2. <del>Translate the necessary objects into JSON </del>

	
  3. <del>Have the ratings show and update on the Lesson page without a refresh</del>

	
  4. <del>Have a lesson's comments show and instantly update on the Lesson page without a refresh</del>

	
  5. <del>Have the lesson title show</del>

	
  6. <del>Be able to create new ratings and comments from the lesson show page without a refresh</del>

	
  7. Ensure that the ratings and comments are manageable on the lesson show page.


![giphy.gif](https://rubydoobiedoo.files.wordpress.com/2016/04/giphy.gif)ast one fast one!

This last goal I came up with as i was scrolling through all of the ratings and comments that were automatically generated and I thought "Wow, I hate this. I want these to disappear now". And BAM. NEW FUNCTIONALITY OUT OF ANNOYANCE.

So I added buttons! ![giphy.gif](https://rubydoobiedoo.files.wordpress.com/2016/04/giphy.gif)

They default so that the rating and comment forms are open while the Ratings and comments can be opened or closed. I added some button div's to my display and then added the following listeners as toggles, so that I could show/hide as opposed to just showing or hiding these results!![Region capture 18.png](https://rubydoobiedoo.files.wordpress.com/2016/04/region-capture-18.png)



	
  1. <del>Make the Lesson directory more manageable.</del>

	
  2. <del>Translate the necessary objects into JSON </del>

	
  3. <del>Have the ratings show and update on the Lesson page without a refresh</del>

	
  4. <del>Have a lesson's comments show and instantly update on the Lesson page without a refresh</del>

	
  5. <del>Have the lesson title show</del>

	
  6. <del>Be able to create new ratings and comments from the lesson show page without a refresh</del>

	
  7. <del>Ensure that the ratings and comments are manageable on the lesson show page.  </del>


So there you have it! In 7 easy steps you converted your pure rails application, into a ruby front end. There's quite a bit refactoring I can do, including removing a lot of ruby class methods, as well as transitioning my other views to use JSON, but as I was once told "Don't just make features, make features make sense". If you don't need up to date real time data. Don't bother with JS, if you do. worry about it and change it accordingly. Now My ratings and comments are synonymous with the lesson that they belong to, as they should be. And thats a good place to finish my projects first new feature.

If you have any advice, tips,  or that if you noticed  that I incorrectly addressed a component please do not hesitate to let me know in the comments!


