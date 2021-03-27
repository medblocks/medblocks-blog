---
layout: post
title: Frontend frameworks - Why you should reconsider
subtitle: 
thumbnail-img: /assets/blog/.png
tags: []
comments: true
---
# Why using a framework matters 
Frameworks today are mostly how people build front end applications. Companies hire "React", "Angular" or "Vue" developers because they want the team to work with their existing code base. However, they are not the only way to build applications. When I got started with building front-end applications, Vue was my first framework. It was easy to pick up and learn. The first time I encountered a problem was when I was building [Voice Intern](https://voiceintern.com/). I wanted the doctor and the transcriptionist to have a common "form" and wanted the changes made by each to update the screen real-time. Think Google Docs, but for any structured form data.

Vue had a plugin called [Vue Formulate](https://vueformulate.com/) to handle these kind of tasks and I used it.

Until I realized that when there were too many fields and [repeatable elements](https://github.com/wearebraid/vue-formulate/issues/171), everything became sluggish. So I dug deeper and found that the problem was with how Vue does the updates internally on the VDOM. 

Okay. What next?

I came across [Svelte](https://svelte.dev/) and gave it a try. It was not a "framework" in the traditional sense and it was meant to compile down your code into pure Javascript at run time. This meant that the package size delivered to your user's end device is very minimal. And since there is no overhead of the VDOM and diffing, everything was supposed to be smooth. I tried the same example using Svelte and to my surprise, it worked very well. There was no noticible lag. And this was a huge template with a lot of fields.

So, I build all of medblocks-ui on Svelte.

There was a project that I was working on that required a lot of clinical forms. I built all of them using Medblocks UI. The final day of testing came and they opened the website on their tablet and tried it out. They complained that the interface was a bit sluggish. How could that be? There is no VDOM. There is no diffing. Everything should be effecient. And it was buttery smooth on my PC and even my mobile phone. 
However, they were using a **Rs.10000 ($120)** tablet and just trying to run the javascript was causing sluggish behaviour. And most of the tests that Svelte did were for very simple pages. My page was using 60+ components and that was bundling up much more JS that it would have if I had stuck with a framework like Vue.

# The costs of using a framework
## Page load speed

## User experience and "sluggish" behaviour

## You can only hire (React or Vue or Angular) developers 


# Where to go from here
Most frameworks focus on building everything as components. However, the web platform has been coming up with it's own solution. Web components! And they have been around for some time now. And almost all major browsers support it. However, that in itself is not the innovation. The real innovation comes from work done by projects like [lit-html](https://lit-html.polymer-project.org/) and [stencil](https://stenciljs. Stencil focuses on building components to be compatible with every major framework. Most frameworks offer great support for web components these days (except React) - check out [this website](https://custom-elements-everywhere.com/) to know more.

I'm personally more interested in lit-html and lit-element. The effecient rendering engine seems to be the core of everything and it leverages the native browsers custom element and template implementation giving great results performance wise. There are a lot of other [webcomponent based tech](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) out there.

Webcomponents bring something fundamental to how we build and ship components. Take shoelace for example, built using lit-html. These UI elements can be used anywhere by anyone in any framework of choice. But I would prefer to build it with no framework at all and just use the lit-html for rendering the DOM effeciently.

I will soon be building most of medblocks-ui as custom elements and will be trying out the same exact interface using lit-html and webcomponents. I will post about how it goes. Stay subscribed to know more.


