---
author: rubydoobiedoo
comments: true
date: 2016-03-31 14:36:10+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/03/31/know-thy-self/
slug: know-thy-self
title: Know thy SELF
wordpress_id: 708
---

[code language="ruby"]

self.

[/code]

a prefix that you'll commonly see in ruby. what does it mean though? whats the reason that some methods have self and others leave it out?

In ruby, methods that are defined by using 'def'

[code language="ruby"]
class Message
attr_accessor :announcement

def this_method
puts "this method is an instance method"
end
end
[/code]

will inherently be created as an instance method. meaning that if an instance of Message is created, e.g. @message = Message.new
@message.this_method

will return
"this method is an instance method"
These instance methods only refer to the instance of the class that they are called upon. class methods, are different. they won't respond to the same instance methods and the nomenclature of defining them is by putting self. in the method name


[code language="ruby"]

def self.new
@message = self.new
end

[/code]
.new is an example of a class method, that is an inherent method of classes. Knowing how .new works you can see that self. refers to the class Message. Another class method that is inherent that you're most likely familiar with is .create, which instantiates and then persists the instance of the class created.

Adding self. to the names of methods, and even inside of methods, won't ALWAYS break your instance methods, which makes it all the more dangerous. So make sure to get in the habit of using it correctly!





