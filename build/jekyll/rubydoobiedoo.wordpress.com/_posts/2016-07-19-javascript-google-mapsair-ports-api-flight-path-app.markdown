---
author: rubydoobiedoo
comments: true
date: 2016-07-19 19:06:58+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/07/19/javascript-google-mapsair-ports-api-flight-path-app/
slug: javascript-google-mapsair-ports-api-flight-path-app
title: Javascript Google Maps/Air-Ports API Flight Path App
wordpress_id: 1277
---

I've always had a fascination with maps.

Definitely had my dad to thank for that, because of him my childhood revolved around maps like this:

![hobbiton.jpg](https://rubydoobiedoo.files.wordpress.com/2016/07/hobbiton.jpg)

Yup, I was the cool one that had read the Hobbit before you were required to in High School and had memorized what the inside of my locker looked like by the end of my freshman year (totally unrelated).

That being said, nearly everything that I build nowadays for fun, uses some sort of Maps API, for due to my love of cartography.

Recently I made a simple flights app that charts distances between two airports in the US. Basically it works like this:

![Flight gif](https://rubydoobiedoo.files.wordpress.com/2016/07/flight-gif.gif)

To do this I needed a couple things:



	
  1. A Maps API

	
  2. An Airports Database


So let's begin with number 1!

Easy enough, head over to [google maps developer page](https://developers.google.com/maps/), and sign yourself up for an api key. Immediately, you can use that to create your script at the bottom of your page. ![Region capture 1.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-1.png)

Make sure you have the right placement! You're going to want to put it AFTER your div#map as you need to load the placement of the map, before you call the api for the map. Also make sure that you're using the geometry library, we're going to be using that later for our euclidian line.

Next we're going to setup our map initialization and center it on the US. ![Region capture 2.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-21.png)

Great! So that's our first big step is done. Don't forget to add in your map#div!

At this point we should have a functional google map that you can pan around with.

Next let's grab our airports!

To do this I found the air-ports site, which is a API accessible database with the world's airports. Go ahead and sign up as a developer [there](https://www.air-port-codes.com/) so that you can setup grab an API key and secret.

Now that you've got that, we're going to use AJAX's handy autocomplete function in order to make an autocomplete search bar for the application. The request will look like this: ![Region capture 3](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-31.png)

But remember we don't want ALL the airports we just want some of them! The US in particular! So our callback is going to use a filter function in order to sort out airports without a US country tag as well as airports that don't provide their position datapoints.

![Region capture 4.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-41.png)

In order to make it functional let's add our search bar to the index.html front page. We're also going to add the necessary jquery libraries for the smooth opening and closing of the autocomplete entries.![Region capture 16.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-16.png)

Great! now we have a usable search bar that queries the API for us airports! But when we select them we want to add a marker right? Back to the Google maps documentation! We'll use the google maps Marker object to do this. First we need to make sure that we have an event to capture the selected feature, so lets finish up our autocomplete function.

![Region capture 9](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-91.png)

Great! Now lets make that marker function

![Region capture 7](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-71.png)

Cool! So we're going to be passing 3 arguments to this function, the selected click which is an output of the select listener. And the dPoints and fPoints, which are empty arrays that we'll be using to store our markers.

So let's create call those variables underneath our DOMContentLoaded call (which should wrap around all of our code besides the initialize map function at this point). ![Region capture 10.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-101.png)

and then finish up our setMarker function, by adding the dPoints and fPoints arrays (which correspond to our newly made empty arrays.![Region capture 14.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-14.png)

Great! Now we've got a function that creates and persists our markers locally. If you noticed though that the dPoints and fPoints arrays contain slightly different marker information. We'll get to why that is in a second. Let's call our setMarker function now at the bottom!![Region capture 15.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-15.png)

Great! Now we should have a map that uses autocomplete to specifically position markers on the map corresponding with the data query to the air-ports api that results in the proper latitude and longitude of the airports!

![giphy (1)](https://rubydoobiedoo.files.wordpress.com/2016/07/giphy-1.gif)

Technology is amazing.

But we can go deeper!

We want to add a flight path if we have two points on the map. So just for the sake of an understandable UI, let's add beginning and end search bars and a reset markers button so we don't have to refresh if we mess up.

So our body of the index.html should be looking something like this now![Region capture 18.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-18.png)

Okay we'll so now let's add a new event listener and some easy functions to reset all of our variables and inputs. ![Region capture 19.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-19.png)

Now that we have a "Get out of jail free" button, let's create our flight path. Now we're going to be using those f and dPoints arrays! So let's think about what we need here. We'll need to make sure that the function only works with 2 flight Points, then we'll need to use a couple other google maps functions such as the computeDistanceBetween function to find the distance and the Polyline function to draw the actual line!

![Region capture 20.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-20.png)

So here we have our flight path being created if the fPoints array has two points. Further more we're usign the geodesic property to create a euclidian line, as planes generally don't burrow through the earth to get from one point to the other. Farther down, we've got a confirmation that reset's the map upon the function being called with a different number of fPoints.

But wait how is the distance going to be calculated??

Good question! The default for the computeDistanceBetween method is km, and we want it to be in nautical miles, so we're going to create a function that converts that really quickly then place the updated figure in our DOM.

![Region capture 21.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-211.png)

Almost done! Where will we call our createFlight Method? Well first we need one more verification to make let it be called, so we don't have it being setoff with only 1 fPoint.

![Region capture 22.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-22.png)Now that we have that why don't we call it in our setMarker function?

![Region capture 23.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-23.png) And there you have it. Now you have a functional, javascript web app that calculates the distance between two airports. There are other things that you can do with this app of course, add a selection field to filter certain countries, add panToMarker functions (as I have in my example), make more functional search bars that save the start and end points in different arrays. And dozens of other implementations for you to try out and share with me (if you dare!). Now go forth and

![sm96car](https://rubydoobiedoo.files.wordpress.com/2016/07/sm96car.gif)
