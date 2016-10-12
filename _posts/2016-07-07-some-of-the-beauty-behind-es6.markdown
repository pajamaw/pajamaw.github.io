---
author: rubydoobiedoo
comments: true
date: 2016-07-07 15:02:51+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/07/07/some-of-the-beauty-behind-es6/
slug: some-of-the-beauty-behind-es6
title: Some of the Beauty Behind ES6
wordpress_id: 1150
---

So I'm not sure if you heard but Javascript recently (about a year ago so in tech terms not recent at all) got a bit of an upgrade! ES6 or ECMAScript2015! Now last year when it originally came out, browser support for ES6 was quite limited, but you could transpile it into ES5 code...but who likes extra steps?

Now that it's been a full year, ES6 is fully supported by browsers and ES7 is currently on its way. You can read more about this transition over [here](http://v8project.blogspot.com/2016/04/es6-es7-and-beyond.html), since I'm done talking about the future.

Because who can rightly prepare for the future, without an adequate understanding of the past and present?

![giphy (1).gif](https://rubydoobiedoo.files.wordpress.com/2016/07/giphy-1.gif)

Be prepared...

So to begin, what is  Javascript? Well, let's take a look at what the experts at [Wikipedia](https://en.wikipedia.org/wiki/JavaScript) said:

"**JavaScript** ([/ˈdʒɑːvəˌskrɪpt/](https://en.wikipedia.org/wiki/Help:IPA_for_English)[[5]](https://en.wikipedia.org/wiki/JavaScript#cite_note-5)) is a[high-level](https://en.wikipedia.org/wiki/High-level_programming_language), [dynamic](https://en.wikipedia.org/wiki/Dynamic_programming_language), [untyped](https://en.wikipedia.org/wiki/Programming_language#Type_system), and[interpreted](https://en.wikipedia.org/wiki/Interpreted_language) programming language.[[6]](https://en.wikipedia.org/wiki/JavaScript#cite_note-FOOTNOTEFlanagan20111-6) It has been standardized in the [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)language specification.[[7]](https://en.wikipedia.org/wiki/JavaScript#cite_note-FOOTNOTEFlanagan20112-7) Alongside[HTML](https://en.wikipedia.org/wiki/HTML) and [CSS](https://en.wikipedia.org/wiki/CSS), it is one of the three core technologies of [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web) content production; the majority of [websites](https://en.wikipedia.org/wiki/Website) employ it and it is supported by all modern [Web browsers](https://en.wikipedia.org/wiki/Web_browser) without [plug-ins](https://en.wikipedia.org/wiki/Browser_extension).[[6]](https://en.wikipedia.org/wiki/JavaScript#cite_note-FOOTNOTEFlanagan20111-6)JavaScript is [prototype-based](https://en.wikipedia.org/wiki/Prototype-based_programming) with[first-class functions](https://en.wikipedia.org/wiki/First-class_function), making it a[multi-paradigm](https://en.wikipedia.org/wiki/Multi-paradigm) language, supporting[object-oriented](https://en.wikipedia.org/wiki/Object-oriented_programming),[[8]](https://en.wikipedia.org/wiki/JavaScript#cite_note-ECMA-262-8) [imperative](https://en.wikipedia.org/wiki/Imperative_programming), and[functional](https://en.wikipedia.org/wiki/Functional_programming) programming styles.[[6]](https://en.wikipedia.org/wiki/JavaScript#cite_note-FOOTNOTEFlanagan20111-6) It has an [API](https://en.wikipedia.org/wiki/Application_programming_interface) for working with text,[arrays](https://en.wikipedia.org/wiki/Array_data_type), dates and [regular expressions](https://en.wikipedia.org/wiki/Regular_expression), but does not include any [I/O](https://en.wikipedia.org/wiki/Input/output), such as networking, storage, or graphics facilities, relying for these upon the host environment in which it is embedded.[[7]](https://en.wikipedia.org/wiki/JavaScript#cite_note-FOOTNOTEFlanagan20112-7)"

![JfX8Rig.jpg](https://rubydoobiedoo.files.wordpress.com/2016/07/jfx8rig.jpg)

More or less, it's a scripting, dynamic, non-true OO language, that all major web browsers rely on in order to function. It's also become a popular server-side language, with the growing popularity of Node.js. One of the most interesting features of it grants it one of todays most notable function, the ability to asynchronously update a webpage, making realtime data adjustment (think of autocomplete, map updates, any sort of instant data aggregator like stocks) possible!

Wow PJ! That's incredible, but isn't it weird that it's the only language of the  [top 5 programming languages](http://pypl.github.io/PYPL.html) that isn't an OO language?

Glad you asked informed reader!

Well it's not a true OO language, it's a prototype-based OO language. Meaning that instead of using classical inheritance, where an object will be instantiated via a class and will inherit all the functions from said class, which can then be linked into a hierarchy by the class - Prototypal works by allowing objects to indirectly inherit from other objects, allowing you to indirectly create a form of inheritance from classes that do not need to be truly related.

Now E6 has brought about a lot of cool (if you're into OO) features that are brand new to vanilla JS  and that previous versions of JS allowed you to do, but via roundabout/hacky programming.

Now just a disclaimer, I'm no professor of JS, and I'm definitely not an expert. I'm simply a new, young, probably naive, programmer that is trying to understand this massive mound of information as well as I can - while helping others to do the same. [Some](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3#.xlv3np4nc) may say that it's a bad thing, that OO languages are not the way to go and that Javascript's malleability is one of its strongest attributes, that this bearing towards OO land is bad. As a new programmer though, I find OO languages very straightforward, they make sense, they mimic the world we live in, so I'm a fan.

Cool so let's begin, and what better feature to begin with than...

**CLASS INHERITANCE**

So in previous versions of JS, if you wanted to inherit from another object you had to first create your "class object" ![Region capture 3.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-3.png)

and then extend it to another object. ![Region capture 4](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-4.png)

but unfortunately here, if we were to check and see our square.constructor -> it would end up being classified as Polygon, which we don't want. We want it to be classifed as a Square! so now we have to go back in ![Region capture 5.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-5.png)

FINALLY DONE.

Well let's take a look at our new class constructor in Es6, ![Region capture 7](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-7.png)

and now try to extend it..![Region capture 8.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-8.png)

and now we're done! wow, so it simplifies the entire process in an organized manner and then allows you to 'super' the previous arguments required to instantiate and still use the get area() method (a getter method btw!).

Incredible PJ!....but what else?

**STRING INTERPOLATION**

And no I didn't misspeak, no longer will we have to use string contecation as this isn't your father's string input method. Now we can write,

![Region capture 9.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-9.png)

and guess what it'll print out if you call the sentence var?

"This finally works".

HOW GREAT IS THAT. No more playing with 1000 little +'s.

**PROMISES**

Promises are a whole blog post of their own, but until then know that vanilla javascript now supports them without the use of other libraries.

**ARROW FUNCTIONS**

Arrow functions are also very cool shortcuts for previously wordy code, and I still need to play around with them a lot more but until then check out this great example of how they now work. ![Region capture 10.png](https://rubydoobiedoo.files.wordpress.com/2016/07/region-capture-10.png)

Cool right?

Those are some of the new features that I find extremely interesting, and I definitely think we'll be seeing them come up more and more often as we move forward.

ES6 and Javascript in general is a fascinating language with a lot of depth. I encourage everyone to readup on not only the current implementations but also the past, as it gives you a better understanding of how things work they way they do and where it's headed.

In the meantime, I also recommend trying out [WarriorJS](https://github.com/olistic/warriorjs), to practice these skills!
