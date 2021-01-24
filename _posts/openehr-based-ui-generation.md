---
layout: post
title: What is openEHR and How Do I Use It?
subtitle: A practical guide to Archetypes and Templates.
thumbnail-img: /assets/blog/.png
tags: ['openehr']
---

# The openEHR philosophy
When designing a health IT system, it is common for the developer to "just start working" on what the doctors want. It's not uncommon for a developer to code in things like Blood pressure or Heart rate in the software. In fact, that's the only way they know how. This is basically how a typical development cycle looks like:
1. Gather requirements from a doctor or nurse.
2. Plan and build software that meets these requirements.
3. Demonstrate the product to the doctor or nurse.
4. Receive feedback about changes and new requirements.
5. Go back to step 1.

openEHR challenges this traditional approach. It instead proposes that the software developed must be dumb and should not know anything about the content that's going to be entered. And I agree, because I too believe that [dumb networks are better than smart networks](https://medium.com/@aantonop/why-dumb-networks-are-better-f0b94c271b76) because they let people innovate faster. This is especially true for the healthcare industry, where innovation has been stagnant due to the fact that we employ extremely smart products and as a result, we're basically stuck with them.

So instead, you develop software based on fundamental concepts and you add other "resources" or "artefacts" that makes the system work. So the development cycle becomes very different:
Software development - done by developers:
1. Implement a system that follows the latest openEHR reference model
2. Look for updates in the reference model, if present, go back to step 1

Content development - done by domain experts (doctors/nurses/health informaticians): 
1. Gather new requirements.
2. Create artefacts based on these requirements (templates and archetypes).
3. Test these artefacts with software that follows the openEHR reference model.
4. Find gaps in these artefacts.
5. Go back to step 1.

The reason why the above approach is much faster is because 2 separate teams can finish these cycles much faster. The development team understands the language of Classes, Inheritence, Databases and tables while the domain experts understand Systolic, Diastolic etc.

In the video below, I show a simple demo of how an EHR based complelete on templates can function, along with some orientation:

<div class="youtube-embed-container">
<iframe src="https://www.youtube.com/embed/Zn4Muj2IOlM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

