---
author: rubydoobiedoo
comments: true
date: 2016-02-13 00:44:55+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/02/13/my-first-gem/
slug: my-first-gem
title: my first gem
wordpress_id: 75
post_format:
- Video
---

Hello There!

After a nearly a month of putting it off, I finally sat down to create my first ruby gem. Now, this wasn't the _very_ first time that I had the resolve to do so, but it is the first time that I saw it entirely to its completion.

And it feels great! The whole reason I dove headfirst back into programming was so that I could start building again....sure I've built out web scrapers and various other applications similar to this gem prior to it in my coursework, but this one was special. Not only was it my idea to build-but the reason that I built it out was simply because I thought it would take too long to do by hand!

Basically, I built my first gem out of laziness.

The process itself is extremely straightforward. By the  running


// ♥ bundle gem your_new_gem




Bundler (assuming you have rubygems installed) creates and initializes a new file structure skeleton for your new gem. One of the most important pieces of it is the gemspec file that it creates for you.





###### **Gem::Specification.new do |gem|**
** gem.name = 'karma_count'**
** gem.version = '0.0.0'**
** gem.date = Date.today.to_s**

** gem.author = ["PJ Wickwire"]**
** gem.email = 'pjpeterww@gmail.com'**
** gem.files = ["lib/karma_count.rb", "lib/cli.rb", "lib/scraper.rb", "lib/student.rb", "bin/karma"]**

** gem.summary = "A gem to list out all the learn-verified students karma points"**
** gem.homepage = 'http://github.com/pajamaw'**
** gem.licenses = 'MIT'**

** gem.executables << 'karma'**




###### **end**


The layout will look something along the lines of this. This last line you see the "executables" is the line that allows you to run your gem from $PATH. In order to do that the only thing you need to ensure is that you have a shebang line in your bin folder where your application is run.

Moving on, the job of karma_count is to scrape the learn-verified students' profiles in order to store and then list their "karma" points. Karma points are points awarded for helping other students out with technical issues that they're facing.

I was talking with my friend about those that were ahead of us in the course and figured that those that were farther ahead of us helped others out less in order to get through the material faster. My friend thought the opposite, saying that they must get bored if they're getting through it so fast and so they probably help out because they simply like the challenge! With that in mind I sought out everyone's karma!

Using Nokogiri and open-uri I scraped a site which we previously were tasked with which had each students name and github url's. The github url's were necessary because the path of each url was the path for the next student site that had the karma data that I required.


###### def add_student_attributes(attributes_hash)
attributes_hash.each do |k,v|
self.send(("#{k}="), v)
end
end


After initializing all of the students with hashtributes I scraped and stored their profile information into the corresponding student instances using the above code with  #send.

With that data I then had the necessary tools to scrape their profiles for karma.


###### 




###### def self.scrape_profile_page(profile_url)
specific_student = {}
begin
doc = Nokogiri::HTML(open(profile_url))
rescue
specific_student[:github_url] = nil
else
doc.search(".social-icon-container a").each do |social|
if social.attribute("href").value.scan(/github.com/) == ["github.com"]
specific_student[:github_url] = social.attribute("href").value
else
specific_student[:github_url] = nil
end
end
end
specific_student
end




###### def self.scrape_learn_for_karma(github_url)
specific_karma = {}
if github_url != nil
gh_parse = URI::parse(github_url)
learn_url = "https://www.learn.co" + gh_parse.path + ".html"
begin
doc = Nokogiri::HTML(open(learn_url))
rescue
specific_karma[:karma] = nil
else
points = doc.css(".karma-points h3").text.to_i
specific_karma[:karma] = points
end
else
specific_karma[:karma] = nil
end
specific_karma
end


These methods I used to scrape the information consecutively. Breaking the methods down you can see how each works.



	
  1. I set each blank hash awaiting attributes

	
  2. I then use the begin and rescue methods while I open and parse the url's. The rescue method prevents the program from stopping if it encounters a bad gateway.

	
  3. I then use css selectors to grab the data that I need.

	
  4. Set the data to the hash, rinse and repeat!


The karma method works in a similar fashion while using the URI::parse(x) method. This method parses out a url into its components i.e. its domain, path, query, etc. This was simpler than regex and made sure that I got what I wanted.

After self.send ing the attributes to the instances I've got my final dataset.

I created a simple CLI that respawned a new screen with every command by using system 'clear' at the beginning of my header method like so:


###### def header
system 'clear'
puts "______WELCOME TO THE KARMA COUNT____"
end


With my simple CLI in place all I needed was to be able to access and manipulate the data. As it was the first version of my first gem, I just needed it to work.


###### def all_karma
header
competitors = Student.all.select do |student|
student.karma if !(student.karma.nil? )
end
competitors.sort_by!{|student| student.karma}
puts "_______________KARMA HIGH SCORE_____________"
competitors.reverse.each_with_index do |student, index|
puts ""
puts " #{index.to_i.next}. #{student.name.upcase} from #{student.location} with #{student.karma} POINTS!"
puts "------------------------------------------------"
end


So to iterate over the array of of instances I used #select to immediately only grab the students that had karma != nil. So any of those that encountered bad gateways were immediately taken out of the scoreboard.

I used #sort_by! to change the competitors array in place and finished by using #reverse to label the students from highest to lowest while using #each_with_index so that the program could count out each for itself.

After adding a few more features such as search functions and a top 10. After I was sure that it worked (despite the speed) I completed the gem with gem push. This pushed the current commits up to rubygems which then listed it as a finished gem product ready to download.

If you like the idea behind it check it out you can download it


// ♥ gem install karma_count


I'll be building more and updating this blog more often so feel free to follow as I continue to explore new topics and write about my adventures and struggles through SQL, sinatra, ORM, AR, rails, JS, JQUERY, and more!



