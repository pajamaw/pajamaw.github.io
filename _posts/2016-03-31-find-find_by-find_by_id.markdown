---
author: rubydoobiedoo
comments: true
date: 2016-03-31 14:37:49+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/03/31/find-find_by-find_by_id/
slug: find-find_by-find_by_id
title: Find, Find_by, Find_by_id
wordpress_id: 743
---

Find, find_by, and find_by_id







These three selector class methods are not interchangeable. Yes, you can use these all to return the same values when they exist within your database, but what makes them special and DIFFERENT is what happens when those values DONT exist.







When you use find, the argument that it takes, it will by default try and find the id of the class being searched for, will return nil if the instance is not found.







Where as if you use find_by or find_by_id an exception error will occur if the particular instance is not found.







This is important because if you're building an application and you want to raise an exception error, you would use the find_by method, where as if you had setup your application to respond to a .nil? you would consider using the .find method.







My only recommendation would be to not get in the habit of using the .find_by_id method, as this is a shortcut that was made from the find_by method and will most likely not be passed on from Rails 4 to Rails 5 when they decide to cut down the fat.
