---
layout: post
title: Frontend Frameworks -  Why you should reconsider
subtitle: Webcomponents and Beyond
thumbnail-img: /assets/blog/vue_forms.gif
tags: ["UI/UX"]
comments: true
---
# My journey into frameworks
Frameworks today are mostly how people build front end applications. Companies hire "React", "Angular" or "Vue" developers because they want the team to work with their existing code base. However, they are not the only way to build applications. 

When I got started with building front-end applications, Vue was my first framework. It was easy to pick up and learn. The first time I encountered a problem was when I was building [Voice Intern](https://voiceintern.com/). I wanted the doctor and the transcriptionist to have a common "form" and wanted the changes made by each to update the screen real-time. Think Google Docs, but for any structured form data.

Vue had a plugin called [Vue Formulate](https://vueformulate.com/) to handle these kind of tasks and I used it.

Until I realized that when there were too many fields and [repeatable elements](https://github.com/wearebraid/vue-formulate/issues/171), everything became sluggish. So I dug deeper and found that the problem was with how Vue does the updates internally on the VDOM. 

![Vue Formulate lag](/assets/blog/vue_forms.gif){: .mx-auto.d-block :}

Experience sluggish behaviour [first hand](https://codepen.io/crawf/pen/qBbKEBJ).

Okay. What next?

I came across [Svelte](https://svelte.dev/) and gave it a try. It was not a "framework" in the traditional sense and it was meant to compile down your code into pure Javascript at run time. This meant that the package size delivered to your user's end device is very minimal. And since there is no overhead of the VDOM and diffing, everything was supposed to be smooth. I tried the same example using Svelte and to my surprise, it worked very well. There was no noticeable lag. And this was a huge template with a lot of fields.



So, I build all of [Medblocks UI](https://blog.medblocks.org/2021-01-26-introducing-medblocks-ui/) with Svelte.

There was a project that I was working on that required a lot of clinical forms. I built all of them using Medblocks UI. The final day of testing came and they opened the website on their tablet and tried it out. They complained that the interface was a bit sluggish. How could that be? There is no VDOM. There is no diffing. Everything should be efficient. And it was buttery smooth on my PC and even my mobile phone. 
However, they were using a **Rs.10000 ($120)** tablet and just trying to run the javascript was causing sluggish behaviour. And most of the tests that Svelte did were for very simple pages. My page was using 60+ components and that was bundling up much more JS than it would have if I had stuck with a framework like Vue.

# The costs of using a framework
## 1. Page load speed
The first huge problem with using frameworks is that you send the client more javascript than is necessary. If we take a look at Bundlephobia at the costs of different frameworks, we can quickly conclude that adding Angular can add a whole second to the loading of the page. 

![Angular bundle size](/assets/blog/angular_bundle.png){: .mx-auto.d-block :}

React and Vue do a little better, but the lesser javascript you ship, the better. It's not just the time for downloading the javascript. It's also parsing and executing it - mobile devices are [particularly slow at this](https://medium.com/reloading/javascript-start-up-performance-69200f43b201).


## 2. User experience and "sluggish" behaviour
Having a Virtual DOM is an unnecessary abstraction that was invented at the time other frameworks were REALLY slow. React came up with the idea, and everyone thought it was the way to go. However, we've come a long way now. Having the VDOM slowing down a user interface because it has to update every single node every render cycle is just insane.

## 3. You can only hire (React or Vue or Angular) developers 
This is in my opinion, is the highest cost that one pays for sticking with a framework. Although frameworks like Vue are easy to learn and is basically just javascript, most developers train to become "React" or "Angular" developers instead of just learning the basics of Javascript and applying that to solve the problem at hand. Companies that hire specific framework developers also lose, because if some work is done in another framework, porting it to their framework is time consuming and expensive.


# Where to go from here
Most frameworks focus on building everything as components. However, the web platform has been coming up with its own solution. Web components! And they have been around for some time now. And almost all major browsers support it. However, that in itself is not the innovation. The real innovation comes from work done by projects like [lit-html](https://lit-html.polymer-project.org/) and [stencil](https://stenciljs. Stencil) focuses on building components to be compatible with every major framework. Most frameworks offer great support for web components these days (except React) - check out [this website](https://custom-elements-everywhere.com/) to know more.

I'm personally more interested in lit-html and lit-element. The efficient rendering engine seems to be the core of everything and it leverages the native browsers custom element and template implementation giving great results performance wise. 

The functional paradigm of lit-html (and also hyperhtml) lets you represent the User Interface as a function of state in a beautiful and efficient manner. 

```js
let count = 1
(count) => {
    html`<div><button @click=${count++}>Clicked ${count} times</button></div>`
}
```

That's it. A render is queued only when necessary. And it only updates the nodes that need updating by seeing what has changed. Not a bit more.

There are a lot of other [webcomponent based tech](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) out there.

Webcomponents bring something fundamental to how we build and ship components. Take [shoelace](https://shoelace.style/), for example, built using lit-html. These UI elements can be used anywhere by anyone in any framework of choice. Using web components means you don't have to worry about frameworks at all. Have a nice Search UI component built using lit-element? You can use it anywhere that HTML can be used! That means an Angular project, a Django template, a Spring application or even in Stencil or Svelte.  

I will soon be building most of medblocks-ui as custom elements and will be trying out the same exact interface using lit-html and webcomponents. I will post about how it goes. Stay subscribed to know more.