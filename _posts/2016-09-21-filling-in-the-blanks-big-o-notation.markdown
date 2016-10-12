---
author: rubydoobiedoo
comments: true
date: 2016-09-21 17:18:35+00:00
layout: post
link: https://rubydoobiedoo.wordpress.com/2016/09/21/filling-in-the-blanks-big-o-notation/
slug: filling-in-the-blanks-big-o-notation
title: 'Filling in the Blanks: Big O Notation'
wordpress_id: 1607
---

This is the first (real) post in my Filling in the Blanks series. If you're like me, you most likely went through a programming bootcamp of some kind in hopes to achieve fame, fortune, a new hobby, and/or a job! If you are I wish you luck in all of your pursuits, and hope this finds you in time for that big interview.

Big O notation can definitely be a scary principle to those unfamiliar with the concept. So to begin here's a little road map of a few hot topics that I find frequently when the subject is spoken about.



	
  1. What is Big O (and which one are we talking about?)

	
  2. Why Big O?

	
  3. Examples of Big O in the Not-So Wild: Datastructures and Sorts


Before we go into though, I just want to add the disclaimer


## What is Big O?


Great question(s)!

Big O describes the efficiency of an algorithm. Specifically it's used to describe both the efficiency in time (Big O Time) and memory use (Big O Space) of an algorithm. Before we go further, remember that an algorithm doesn't necessarily just connect you to a huge complicated calculus theorem, every method/function that you create in programming is an algorithm.

Sorting through an array? You just used an algorithm!

Selecting an instance from a database? Algorithm!

Everything we do in programming is algorithmic, even if you didn't realize it.

Now there are actually three different types of Big O used in academia (Big O, Big Omega, and Big Theta) to describe runtime. Big O corresponds to the upper bound in a graph, Big Omega the lower bound, and Big Theta the tight bound.

Now don't get these concepts confused with best, worst, and expected case scenarios, because they don't actually correspond with any in particular each O notation can be used to describe each scenario. That being we will talk about the Big notation used in programming, Big O (which in academia is closer to Big Theta) i.e. the tight bound for a function.

So, back to a general programming definition, Big O describes the rate of increase (in memory i.e. space or time) as "n", your input, goes up. If your "n" is equal to an array, and you have to iterate through that array, you're going to do that in Big O(n) time, where n is the number of elements in the input array. If you have an array that you're grabbing an element from a specific index, that will take Big O(1) time, as it is done in 1 step no matter how large the array is.

Say we needed to run through an array twice,  does it take Big O(2n) time? No we'd still say that it takes Big O(n) time. When we describe Big O we don't use constants. A function that runs in Big O(n) we say will equal a function that runs in Big O(2n) because for different values of "n" those can be equal. So never use constants when you're describing a runtime!


## Why Big O?


So as you might be figuring it out now, we use Big O to find the time and memory that will be required to run a function. But what does that really mean and why should I care?

Well let's say that you just got a job with a dating company with 200 members (no worries I'm sure it'll get more successful!) and this job pays you to pick matches for OTHER people. It's got 100 guys and 100 girls. Those profiles are in one array and each user can match with either sex (cause we're being progressive in this post). Well let's say that the company doesn't allow you to skip users, and users don't get removed from the dating pool when they're matched with someone else.

Well, you want to get paid, so you begin. It gives you one person's picture and then you go through each of the 200 (including the same person's picture) as you get matches. Until you go through each match, then on to the next...ad nauseum. You take about 5 seconds per picture because you care (a little) but you don't get your check until you finish, so you finish....55.55 hours later! That's because the run time for the function is Big O(n^2). For each (n) or element of the array, you have to go through the each (n) or element of the array.

Well now you're thinking well this has to get better if the company was more efficient right? 55.55 hour work days are a lot too! So you find a company that has 200 users, but they're in two different arrays, a men and women's array. It gives you a random gender's picture and now you have to cycle through each female picking matches until you're at the end of the girls, and then to the next guy, and again a cycle through each female ...ad nauseum. Then once you finish the first gender you do the second gender. Well how long till you get paid? If it takes you 5 second per couple again, it will take you just under 27 hours to do it! That's a significantly better workday!.

Now we would say that this is Big O(2(m*w)) where m is the length of the men's array and w is the length of the women's array, and even though we're going through the same number of users, it takes less than half  of the time. Remember though, in a real setting we would describe this as Big O(m*w) as we should drop the constants.

But what about Big O space? Well let's use those 2 examples again. In both companies you'll have to use some sort of data structure to store your matches for a person. Let's say you use an array. That means that each person will need to have their own array for their matches. That means you're about to build out 200 array's of up to 200 people each...now that doesn't take any time to make as pushing to an array takes Big O(1) time. but it will take up (n^2) space. That also means that the second company, if they're using the same system will take m*w + m*w or Big O(m*w) time (as we drop the constant).

There are definitely better ways to store such information, and we haven't even gotten into utilizing them for matches! But already you can start to see how Big O would be used to describe real situations.


## Examples of Big O in the Not-So Wild: Datastructures and Sorts


But even then, Big O comes in the most handy when you use them to think about advanced data structures and sorting algorithms. We're going to be going over these in the next several posts in this series, but for now, we'll just begin by describing them and their various methods and runtimes.

First ![Region capture 2.png](https://rubydoobiedoo.files.wordpress.com/2016/09/region-capture-2.png)

Wow, you might be saying how do you even make sense of these charts?

One at a time! (And skipping the hard ones :) )


### Datastructures :


**Array: **As you may have assumed. The array is in fact a datastructure! Despite it being a simple one it does have one very unique capability that makes it invaluable, it's O(1) time for access. If you know the position of an element, you can immediately get access to it. Array's in many languages are often used as the baseline to create many advanced datastructures like Stacks, Queues, and Hash Tables.

**Stack: **A stack is an advanced datastructure that is peculiar in the fact that it can is essentially a LIFO, Last in First Out, array. Meaning that the latest addition to the stack, can be accessed first, while the others can only be accessed by going through each one before it. Think of stacks like the toddler game with the different size rings that can be placed on top of the wooden pole mounted on a wooden platform. Generally Stacks will use functions like push(item), pop(), peek() (to view the top element), and search(item). These methods take O(1), O(1), O(1), and O(n) time respectively. Stacks can be used to implement queues and are often used in DFS algorithms.

**Queue: **A queue is an advanced datastructure that is peculiar in the fact that it is a FIFO, First in First Out, array. Meaning that the least recent addition to the queue, is the first out of the Queue. Like a Stack, Queue can only be searched by going through each element. Think about a Queue like you would any line you've ever been in. Queues generally will use functions like unshift(), push(item), peek() (to view the bottom element), and search(item). These methods take O(1), O(1), O(1), and O(n) time respectively. Queues are often used in BFS algorithms.

**Singly-Linked List: **A Singly-Linked List (SLL) is an advanced datastructure that is peculiar in the fact that each node is connected only to the next node, with a home and an end node. Meaning that the least recent addition to the SLL, the Head, is normally the only one directly accessible much like a queue. SSL's can only be searched by going through each node's 'next' attribute that points to the following node. In a similar way to queue, adding and removing from/to the beginning of a SSL can be done in O(1) time, while adding/removing/searching to any other point would take O(n) time.

**Hash Table: **A Hash Table is an advanced datastructure that is peculiar in the fact that it's essentially an array with a plan. It inputs  key-value pairs in a way that allows you to access any element in O(1) time and add or delete any item in O(1) time. First, a Hash table is created as a certain size (as are arrays in languages like Java). And uses a particular function e.g. calculateHash(key) that uses the input items key and based off whatever constant algorithm you created in your calculateHash (a popular one is to turn the string into an integer and modulo it by the  size of the hash table) to create a hashed index that points to an index position in the array. In that index position is your key value pair stored. Hash tables are remarkably efficient (as long as you don't have too many collisions, something we'll explain more about later). Hash Table's are often considered the gold standard for datastructures to store and hold unsorted user information, and are sometimes used in conjunction with other advanced datastructures like Trees, to be extremely powerful.

**Trees: **A tree is considered an advanced datastructure, that are similar to SSL's in the way that they're made up of nodes that connect to other nodes. These nodes are called parents when they have nodes under them or their children nodes. Nodes that don't have children are called leaf nodes. The first node is called the root. There are several different sorts of Trees, from trees that only accept 2 children (Binary trees and Binary Search Trees), to some that only offer a single character of information (Tries). Tree's are used to connect points of information that relate to one another, and can be used with a variety of data structures. Sorted trees often have some of the best Big O search capabilities at O(n log(n)) as they can follow branches based off of simple conditionals.


### Sorting Algorithms:


**Quick Sort:  **The Quick Sort algorithm works by finding a pivot point, and then sorting the two resulting arrays around said pivot point. The act of finding this pivot point will generally sort the array into a higher side, and a lower side. Depending on the size of array, this pivot point will be found recursively on each minor array. The act of finding this pivot point is an algorithm in itself, and several different of these have made their way into modern use with the Hoare partition being the most efficient. With sorts you do have to worry about the average AND worst case scenario of time it will take, as it can be something to worry about because who knows how your data will be positioned? It's average time is O(n log(n)), but it can be as bad as O(n^2) in the right conditions.

[![Animated visualization of the quicksort algorithm. The horizontal lines are pivot values.](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)](https://commons.wikimedia.org/wiki/File:Sorting_quicksort_anim.gif#/media/File:Sorting_quicksort_anim.gif)
By [en:User:RolandH](https://en.wikipedia.org/wiki/User:RolandH), [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/), [https://commons.wikimedia.org/w/index.php?curid=1965827](https://commons.wikimedia.org/w/index.php?curid=1965827)

**Merge Sort: **The merge sort works on the "Divide and Conquer" theory. It divides lists into sublists, then sorts those sublists, it then combines, and repeats the division as necessary. The final sublist becomes the ultimate sorted list. It  is a remarkably resourceful sort whose expected and worst case sorts are both O(n log(n)).



[![Merge-sort-example-300px.gif](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)](https://commons.wikimedia.org/wiki/File:Merge-sort-example-300px.gif#/media/File:Merge-sort-example-300px.gif)
By [Swfung8](Swfung8&action=edit&redlink=1) - Own work, [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0), [https://commons.wikimedia.org/w/index.php?curid=14961648](https://commons.wikimedia.org/w/index.php?curid=14961648)

**Bubble Sort: **The bubble sort works by "bubbling up" higher values with lower values. It's a commonly used sorting tactic for trees and lists, where you can only access one value at a time. In order to do so, you must iterate through the array potentially n^2 times, making it a very time costly sort to do, with an average of O(n^2) time.

[![Bubble-sort-example-300px.gif](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)](https://commons.wikimedia.org/wiki/File:Bubble-sort-example-300px.gif#/media/File:Bubble-sort-example-300px.gif)
By [Swfung8](Swfung8&action=edit&redlink=1) - Own work, [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0), [https://commons.wikimedia.org/w/index.php?curid=14953478](https://commons.wikimedia.org/w/index.php?curid=14953478)

**Counting Sort: **The counting sort is personally my favorite sort. Why? I think it's absolutely brilliant. Unfortunately it does require three bits of knowledge for your array (I'm sure you could hack around it but for the common implementation these are required) that it only has positive values, that each value is an integer, and that you know the max. The graphic below shows it (decently), but it relies on you creating an array from the size of the max value. You then iterate through the first array, and every time you hit add 1 to the index of the range array to the index of that number. So if you have an array with 3 1's,  rangeArray[1] will equal 3! This addition to the rangeArray takes O(1) time due to Array's O(1) access time! You then (can) create a third final array which as you go through each index, you check the rangeArray and add each number the corresponding amount of times that it has in its "counter". I think it's a remarkably brilliant "hack" of the array's O(1) access time and can be done consistently at O(n+k) where n are the number of elements and k is it's range.

![counting-sort.gif](https://rubydoobiedoo.files.wordpress.com/2016/09/counting-sort.gif)



This may seem like a lot to grasp...and you're right! If you're new to programming, you're most likely new to Computer Science principles which all of these are based upon. But I promise, learning these more and more will help you counter any problem you find, and you'll be amazed at their utility in analytical problem solving in real life and for fun (check out [Nate Silver's company, 538, one of their users posts great riddles one of which I figured out using a Binary search method just the other day!)](http://fivethirtyeight.com/tag/the-riddler/)

This was just a brief (lol 2500 words) intro to these concepts, but I'll be going into each more in depth in the posts to come! Stay Tuned.
