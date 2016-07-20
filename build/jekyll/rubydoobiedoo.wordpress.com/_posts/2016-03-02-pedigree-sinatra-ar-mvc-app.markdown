---
author: rubydoobiedoo
comments: true
date: 2016-03-02 07:19:35+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/03/02/pedigree-sinatra-ar-mvc-app/
slug: pedigree-sinatra-ar-mvc-app
title: Pedigree-Sinatra AR MVC App
wordpress_id: 160
---

For the longest time I've wanted to create an extensive family tree. Even before I was coding. My family's large enough to the point where it's now a family joke when someone knew comes around that they're probably just as closely related to us as some of our other "cousins".

But that's the beauty of a large Italian family.

You can follow along by checking out the code at https://github.com/pajamaw/pedigreev or by cloning the repo at https://github.com/pajamaw/pedigree.git

There are two basic ways to think of and work with applications and each has its own advantages and disadvantages.

I started writing definitions for these but then I realized that Wikipedia does a way better job. So here's what wikipedia has to say about the methods



	
  1. Outside-in


"Of all the [agile software development](https://en.wikipedia.org/wiki/Agile_software_development) methodologies, **outside–in software development** takes a different approach to optimizing the software development process. Unlike other approaches, **outside–in** development focuses on satisfying the needs of stakeholders. The underlying theory behind outside–in software is that to create successful software, you must have a clear understanding of the goals and motivations of your stakeholders. Your ultimate goal is to produce software that is highly [consumable](https://en.wikipedia.org/wiki/Consumability) and meets/exceeds the needs of your client."

2. Inside-Out

"Inside-Out (Classic school, _bottom-up_): you begin at component/class level (inside) and add tests to requirements. As the code evolves (due to refactorings), new collaborators, interactions and other components appear. TDD guides the design completely."(http://programmers.stackexchange.com/questions/166409/tdd-outside-in-vs-inside-out)

So to summarize it. Both are schools of thought that focus on Test Driven Development. Yet, Outside in focuses on consumer side first and then makes the program work. While Inside-out focuses server-side of making the program work then ensuring the consumer's needs are filled.

Being the end user and the programmer, and not having a perfect idea of how to start I'd argue that unless you're extremely confident , working TDD Inside-Out is far more advantageous and will likely not only save your computer from the fury of your wrathful hands after hours of fruitless debugging, but also will make working in groups significantly smoother.  This project begins by establishing your file structure and your database tables. But _even__ before that_. Before you open a new file! M V C. what will your models' relationships with each other be?

![Screenshot 2016-03-02 00.26.29](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-00-26-29.png)

A User has_many :family_trees and has_many :individuals, through: family trees

Family_tree has_many :individuals and belongs_to :user

Individual belongs_to :family_tree

Seems straightforward enough.



In order I needed to :



	
  1. Created the file structure with environment, config.ru,

	
    * gemfile (tux should be BOLDED AND PAINTED...absolutely essential when working with AR and databases)![Screenshot 2016-03-02 00.54.14](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-00-54-14.png)

	
    * rakefile with custom commands in order to make use of the console command ![Screenshot 2016-03-02 00.52.32](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-00-52-32.png)




	
  2. Create basic classes with their model belongs_to/has_many relationships.*![Screenshot 2016-03-02 00.29.16](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-00-29-16.png)

	
    1. Running through it one by one you can see how I laid out my classes and my relationships.

	
      1. The User class makes use of #validates as well as #has_secure_password from the 'btcrypt' gem which I used to encrypt my users passwords.

	
      2. The FamilyTree class is fairly straightforward.

	
      3. Individual class was tough. Initially I was planning on having multiple tables for all the familial relationships but I kept coming back to the same issue _I need to join with myself_. Despite the disturbing imagery that gives to some, I wasn't aware that this was in fact a very common occurrence which can be handled as I did called "THE SELF JOIN"

	
        * Now the self join works by adding additional foreign keys into your class and assigning them to symbols that I can then call later on to access the "Individual" stored. ![Screenshot 2016-03-02 01.08.52.png](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-01-08-52.png)You can see here how the :childs_mother, symbol now represents the instance where the foreign_key: mother_id comes from.

	
        * To finish the dynamic relationship that the individual has with itself the three other fields that were added that the individual can also :belongs_to![Screenshot 2016-03-02 01.12.20.png](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-01-12-20.png)Now when called upon the mother or father that I've assigned to an individual via the foreign keys can be accessed.




	
      4. So by adding a few extra lines to my Individual class and adding 3 additional foreign keys (not including the family_tree fk) I am now able to create helper methods that can easily extend the scope of my pedigree from nuclear family to full extended family through the relations between :spouse, :mother, :father







	
  3. Create the basic forms for Users so that I have the params to create new users. *

	
  4. migrate my users table*

	
  5. Write the user_controller*

	
    1. 

	
      * Once again remembering and testing the #validates method so that bad data is not created.

	
      * Now also becomes the time to test the helper methods and authentification that enforce the private sessions of users ![Screenshot 2016-03-02 01.21.34.png](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-01-21-34.png)

	
      * the session id is stored and created after login and signup via

	
        1. session[:id] = user.id










	
  6. Create the basic forms for family_tree so that i have the params to create new family_tree instances*

	
  7. Write the family_tree controller*

	
    * very similar to the userscontroller barring one exception which i had yet to add(but thinking over as I'm writing this, I'll definitely do tomorrow) is the delete route.

	
    * ![Screenshot 2016-03-02 01.40.53.png](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-01-40-53.png)

	
      * it can definitely be tidied up but it works now. You can see at the top where I stop anyone from deleting the instance if it doesn't belong to them. This is a simple method I use throughout all of my controllers.

	
      * The method below that uses the #select iteration to compile all of the individuals that belong to that specific tree. I then delete them all systematically and then afterwards delete the tree instance itself.







	
  8. Create the basic forms for individuals so that i have the params to create new individuals for the family tree*

	
    1. These were more complicated than the other two simply due to the number of times they were modified in order to work with the system.

	
      * the only two fields i required for the instances were the :name and :gender fields. after debating about whether to use a boolean datatype I decided that using a string datatype and then the <input= type="radio"> was the best method to prevent bad data by only allowing two options.![Screenshot 2016-03-02 01.47.41.png](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-01-47-41.png)![Screenshot 2016-03-02 01.50.10.png](https://rubydoobiedoo.files.wordpress.com/2016/03/screenshot-2016-03-02-01-50-10.png)

	
      * 






	
  9. Write the individuals controller*

	
    1. This was the bulk of the work.

	
    2. though it got significantly easier as soon as I setup my final version of the Individuals Table in the db.

	
    3. Each time an in any field is made a new instance of individual is created and automatically associated with the relationship titles of :spouse, :father, and :mother.

	
    4. And if the params matches a current instance, the relationship is automatically associated.

	
      * The next step here is creating another radio form that takes all of the instances of Individaul from that @family_tree so that instead of remembering to type out a name perfectly , you can simply press a radio or if you choose to you can add an additional instance.




	
    5. Setting up the GUI so that it looked like the image above allowed me to easily create relationships in a bottom-up manner.

	
      1. At this point my job was done, I had created a working prototype, but it lacked any one outside of father, mother, spouse. so using helper methods I expanded the range of the family.







	
  10.  Test*************


Key: *= "And then I tested and went back three steps for 3 hours"

Outside-in requires a fairly strong idea of not only what you're going to build, but also of the many different ways its possible to create it. For those that are just starting off coding, it will probably seem like a daunting task. Going step-by-step with Inside-Out may take longer at the end of the day, but ensuring that each model works before moving on to the next model will make for a much smoother transition when you're coding alone and especially if you're working in groups.


