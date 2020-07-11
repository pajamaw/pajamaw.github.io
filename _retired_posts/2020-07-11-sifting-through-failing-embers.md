---
layout: post
comments: true
title: Sifting through Failing Embers
date: 2020-07-11 11:12 -0400
slug: sifting-through-failing-embers
---

TLDR: KEEP YOUR PROJECTS UP TO DATE WITH LTS. 

We use [https://github.com/ember-cli](Ember) at my current company. And from 2013 to...well _now_, we've not been particularly up to date with the versioning. 

Ember particularly has tried to make things easier by endorsing projects such as [https://github.com/ember-cli/ember-cli-update](ember-cli-update) which runs codemods on the package to update and upgrade the repo as best as it can. It's a great project but there are still issues. There are different strategies that you can employ to reduce the number of faulty modifications and conflicts, but ultimately you'll still have to get your hands dirty. 

The sin of this story is sloth - our laziness in upgrading Ember. 

As any engineer, or anyone in a craft that employs standards that regularly update, knows, the longer one waits to get up to date the harder it is to do so. 

In software engineering there's at least an [https://semver.org/](industry norm) that allows engineers to know when they're about to be screwed. 

Under semver, you know at least that when you're hitting a major version update, you are going to be facing changes that won't be backwards compatible. 

_e.g. Your app should continue to work if you keep the major version. An upgrade from 2.8 -> 3.0 is going to introduce more conflicts than an upgrade from 3.6->3.12 that update is going to require more work than others_

Anyways. 

As I've been writing this I realized that my outrage is self-inflicted. 

