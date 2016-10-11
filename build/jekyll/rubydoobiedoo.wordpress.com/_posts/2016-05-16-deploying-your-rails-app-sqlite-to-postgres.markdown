---
author: rubydoobiedoo
comments: true
date: 2016-05-16 19:34:17+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/05/16/deploying-your-rails-app-sqlite-to-postgres/
slug: deploying-your-rails-app-sqlite-to-postgres
title: 'Deploying your Rails App: Sqlite to Postgres'
wordpress_id: 1093
---

Recently I wanted to deploy my [Manila app](http://manilalist.herokuapp.com) to heroku. But there was a problem. Heroku doesn't accept sqlite3 databases...and rails ships out automatically with sqlite3. So what's a man todo?

Heroku primarily uses the Postgresql database adapter. This means that I need to transition my sqlite3 database to postgres from within my application. So let's get started!

I only had some test data within my development database so I'm not going to worry about moving that data into the new postgres database. (There are ways to do this with the [taps](http://blog.ragnarson.com/2013/10/24/easy-database-migration-using-taps.html) gem, but for this we'll just KISS :D )

First in order to do this make sure you setup your heroku account and download the heroku CLI toolbelt.

Now that you've done that let's add a few gems in order to make this transition smooth.

We're going to add ![Region capture 1.png](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-11.png)

to our gemfile in order to specify that we're using postgresql for our production database.

We're also going to remove sqlite3 from its normal spot in the gemfile and place it within the development test area. ![Region capture 2.png](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-2.png)

In addition to that we'll add in the ![Region capture 3.png](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-31.png)

to allow the rails functionality in the heroku environment.

Now make sure to run 'bundle install' in your terminal to add in these gems to your file!

There are a few more housekeeping items we need to do still though to ensure functionality.

Go to your config/environments/production.rb file and copy and paste this over the 'config.assets.js_compressor = :uglifier' code. ![Region capture 4](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-41.png)

(haha well actually just copy it down since it's a picture file :P.jpeg)

Heroku doesn't support all js minifiers, so if you don't follow this step you may be able to successfully deploy your app to heroku, but you may get errors such as 'injector t invalid' --which stem from the minifier. So get rid of that and don't worry about the excess space you're taking up!

Now the big parts, lets reconfigure the database.yml file in your config folder. I commented out all but the default setting and put in the following: ![Region capture 5.png](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-5.png)

Now there are different norms for adding database names, but I like following that each database should have the prefix of the name of the app and the suffix being the stage in deployment.

Great! save these changes with some good ol' git add, commits and pushes and lets begin the fun part!

Now first login to your heroku account by typing into the terminal 'heroku login' and add your information to log you in.

NOW LETS GET READY TO DESTROY EVERYTHING.

rake db:drop

rake db:migrate

rake db:create

Now that we've dropped our databases and install them onto our new postgres databases lets add these to our heroku app!

Type into terminal 'heroku run rake:db migrate'

You should see a bunch of sql fly through your terminal as everythings being created in front of you.

Next we'll push these changes to the newly created app.

'git push heroku master'.

And congratulations! go to your heroku homepage and check out your newly deployed application.
