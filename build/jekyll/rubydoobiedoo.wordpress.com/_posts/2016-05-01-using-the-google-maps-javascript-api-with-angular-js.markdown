---
author: rubydoobiedoo
comments: true
date: 2016-05-01 05:33:45+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/05/01/using-the-google-maps-javascript-api-with-angular-js/
slug: using-the-google-maps-javascript-api-with-angular-js
title: Using the Google Maps Javascript API with Angular JS
wordpress_id: 1022
---

Google Maps is an absolutely amazing tool of the modern age, and all of its glorious utility, from its visualizations of traffic layers to its topographic map layers - is available to use FOR FREE through the use of its API.

If you'd like to see the angular documentation for using specific features then feel free to check out the angular documentation on it [here](https://angular-ui.github.io/angular-google-maps/#!/api/GoogleMapApi). Assuming of course your application won't be making over 100,000 api requests everyday for a course of 90 days (in this case this little setup may not help you!) here's a brief overview of the first few steps to create your project access key and setup the map on your app!

The rundown on how to do this goes like this.



	
  1. Go to [the google maps developer page](https://developers.google.com/maps/documentation/javascript/examples/place-details) and sign in with the account that you'd like to use as a "Google Developer" (Don't go off thinking that you can use that title for your next resume spot though...)

	
  2. On the top left click the get a key icon ![Region capture 1.png](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-1.png)

	
  3. You'll be asked to sign in again after a prompt telling you that you'll need to create a project. Once you get to the Google APIs page you'll register your new application. By going to the bottom and pressing "Continue".

	
  4. The next page you can name your specific browser key and after you press create you'll receive your API key!

	
  5. At this point you can add additional credentials if you'd like your app to send push notifications or would like your app to access the personal data via google omniauth.

	
  6. Next, ensure that you have downloaded the angular-google-maps angular js package. You can do that by accessing the full code from the [documentation](https://angular-ui.github.io/angular-google-maps/#!/api/GoogleMapApi) or by running "bower install angular-google-maps --save". Afterwards, install angular-simple-logger through the same method.

	
  7. With those dependencies added, require the location paths into the necessary view files (or sprockets for rails/sprockets-alternative for non-rails apps). A sprockets file will look something along the lines of this. ![Region capture 3.png](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-3.png)Note: you may also have to add in Lodash, in some cases depending on the version of the API.

	
  8. Next you'll want to configure the directive after adding it to your angular module alongside nemLogging. The additional libraries can be added for particular google maps data attributes, which can be found in the [documentation](https://angular-ui.github.io/angular-google-maps/#!/api/GoogleMapApi). ![Region capture 4](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-4.png)![Region capture 6](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-6.png)

	
  9. Next lets setup your controller so that you can setup the directive within the view by configuring the map attributes. ![Region capture 8](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-8.png)Other attributes are available, such as editable markers, but we'll just stick with the basics for now.

	
  10. Finally add in the directive to the view page and call the map attributes. ![Region capture 9](https://rubydoobiedoo.files.wordpress.com/2016/05/region-capture-9.png)And wala! You should have a working google maps in the view of your application.


