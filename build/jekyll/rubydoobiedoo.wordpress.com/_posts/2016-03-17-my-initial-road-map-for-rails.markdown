---
author: rubydoobiedoo
comments: true
date: 2016-03-17 20:38:27+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/03/17/my-initial-road-map-for-rails/
slug: my-initial-road-map-for-rails
title: My initial road map for LV Review Rails
wordpress_id: 538
---

for project






	
  1. scraping first through mechanize DATA

	
    1. decided going for categories too so gonna have to do a little more

	
    2. shouldn’t be too bad just have to select every category, then take everything underneath it with the lesson tag and take the span from that




	
  2. 
	
  3. ******omniauth - githbub**

	
    1. ****[**https://www.codementor.io/ruby-on-rails/tutorial/rails-omniauth-with-devise--github-example**](https://www.codementor.io/ruby-on-rails/tutorial/rails-omniauth-with-devise--github-example)

	
    2. EASY as DATA 

	
      1. that is by following the lesson




	
    3. built out a welcome controller and a home view to make that shit easy with login/out/signup/ links so i could add users on the fly got two now

	
      1. my github avatar

	
      2. and pixiedustchi 12345678




	
    4. 



	
  4. StartFragment

	
    1. ******models**

	
      1. ******Users (authentification through github)(guests without comment view rights, but can rate comments as helpful)**

	
        1. ******htey have many**

	
          1. ******comments**

	
          2. ******ratings**

	
          3. ******user id DATA and ddadad**

	
          4. ******make sure guests are just users not authentificated,**







	
      2. ******DATA I HAVE TO GET THE CATEGORIES FIRST**

	
        1. ******FOUND EM**

	
          1. ****** page.search('div[data-topic-slug] div div h3').each do |category| 2.2.3 :019 >puts category.text2.2.3 :020?>   end**




	
        2. ******k now i just need to get them to recognize their own lessons**




	
      3. 
	
      4. ******category**

	
        1. ******has a title**

	
        2. ******they have many**

	
          1. ******lessons**

	
            1. ******kk so far so good with everything now just **




	
          2. have many ratings through lessons

	
          3. have many comments through lessons







	
      5. ******lessons**(

	
        1. ******has a title**

	
        2. ******has many**

	
          1. ******has many comments**

	
          2. ******has many ratings**




	
        3. ******belongsto**

	
          1. ******belongs to category**







	
      6. ******comments**

	
        1. ******has content**

	
        2. ******belongs to**

	
          1. ******belongs to lessons**

	
          2. ******belogns to user**

	
          3. ******belogns to category through lesson**

	
          4. ******finished up here**




	
        3. just add the ability to edit or delete the comments as well




	
      7. ******ratings**

	
        1. ******has a 5 star rating**

	
        2. ******belogns to**

	
          1. ******CHANGING IT DOING POLYMORPHIC DATA**

	
            1. ******has_many :ratings, as: :ratable **

	
            2. ******belongs_to :ratable, polymorphic: true**

	
            3. ****[**http://www.informit.com/articles/article.aspx?p=2220311&seqNum=6**](http://www.informit.com/articles/article.aspx?p=2220311&seqNum=6)




	
          2. ******belogns to lesson**

	
          3. ******belongs to user**

	
          4. ******belongs to category through user**










	
    2. ******After the models**

	
    3. ******do the controllers and make sure routes are good**




	
  5. 3. make that DATA pretty 

	
    1. ******they belong to category**

	
    2. ******i need to scrape titles of the lessons**

	
      1. ******parsed titles**







	
  6. ******KK NOW LETS MAKE COMMENTS EDITABLE **

	
  7. ******THEN WE’LL MAKE RATINGS EDITABLE**

	
    1. ******ALSO ADD IN AN EASY TO INSANE **




	
  8. ******THEN HELPFULNESS RATINGS FOR COMMENTSk**

	
    1. ******sSCRAPPED**




	
  9. 
	
  10. ******kk actually though the last things i’m doing are this**

	
  11. ******2. making it so that only those signed in can do DATA**

	
    1. ******3. potentially make it so i can update the DATA**

	
    2. ******not gonna prettify tonight gonna do js**




	
  12. then I’m going to do my video

	
  13. then my blog post

	
  14. tehn im gonna do a bunch of java

	
  15. ******THEN MAKE IT SO USERS CAN DELETE THEIR ACCOUNTS**

	
  16. ******THEN MAKE IT SO THAT I (THE SOLE ADMIN) CAN DELETE ANY AND ALL THINGS**

	
  17. 
	
  18. THEN MAKE THAT DATA PRETTY (IF YOU WANT)

	
    1. nah okay you definitely do have to make it pretty :( check out the avi’s one its incredible





