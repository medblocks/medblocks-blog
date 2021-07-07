---
layout: post
title: Problems with FHIR
subtitle: Open-EHR
thumbnail-img: /assets/blog/fhir-logo.png
share-img: /assets/blog/fhir-logo.png
tags: ["FHIR"]
comments: true
---

FHIR is first thing you look at, if you are starting in Health informatics, which is easy to implement because you are given a json file to handle and you can make your own resources, but as you develop health care applications you will encounter some problems which we'll look at in this blog.
# There is a huge problem FHIR when using a lot of health care applications regardless of the EHR that we are using. 
For example, let's say you want to make a blood pressure app and in that you want to measure how much the blood pressure was there throughout the day for a patient. While making that, you need to make that specific to a FHIR profile.

If you are using the US core profile and you look at their profiles and you can they represent blood pressure using vital science profile and there they measure heart rate, oxygen saturation and one among of them is systolic blood pressure and diastolic blood pressure, they make it such that observation.component should take in both diastolic and systolic blood pressure individually, which means you have an observation and you have the component attribute and under that you have two separate components one for systolic and another for diastolic.

If you look at some other country, Let's say India for example, here we don't have any profiles for vitals and we only have an observation profile and that too is made open ended.

There are atleast 50 different measurements just for blood pressure and it can be overwhelming for an application developer to choose which of these that he needs to pick and which to use.

If you make an app and you want to run it on every country regardless of which profile they are using, you won't be able to run and it will not happen.
"Your app should be made per profile and that's the whole problem with fhir, yes you can represent everything as resources but the problem that they failed to address was each region will have their own different requirements for how something is represented and that if you make profiles for each and every country you end up having fragmentation of the whole ecosystem and you'll multiple fhir implementations and  you can't just make one app that will run on everysingle platform.
# Solution for the problem faced with FHIR
The solution to this Open EHR or open air and it purpose is same as fhir which is  we are trying to do make data as easy as to communicate but in open ehr it is done in a different way.

We'll take the same example as the blood pressure, in open ehr we have something called clinical manager which collects information about a particular finding that is in our it's blood pressure.
If you look at the mindmap in the clinical manager, they make a maximal data set instead in chit being 80 20 and telling we will only take 20 percent of what is being used around the world these people.
You take  a blood pressure archetype and you cancel out things that you don't want using something called template and automatically all of this gets coded.
With this you can automatically generate interfaces.

## FHIR is a good transmission mechanism it can be used to send documents across very well but it's not a good source of storing the information.
### Open EHR is better for storing information.

A video version of this tutorial is available here:
<div class="youtube-embed-container">
<iframe src="https://www.youtube.com/watch?v=kOU2HGqK23o" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>