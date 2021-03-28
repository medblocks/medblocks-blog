---
layout: post
title: Why You Should Care About OpenEHR
subtitle: A practical guide to Archetypes and Templates.
thumbnail-img: /assets/blog/.png
tags: ['openehr']
---

# The problem
When designing a health IT system, it is common for the developer to "just start working" on what the doctors want. It's not uncommon for a developer to code in things like Blood pressure or Heart rate in software code. In fact, that's the only way they know how. This is basically how a typical development cycle looks like:
1. Gather requirements from a doctor or nurse.
2. Plan and build software that meets these requirements.
3. Demonstrate the product to the doctor or nurse.
4. Receive feedback about changes and new requirements.
5. Go back to step 1.

# The openEHR philosophy
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

# Querying Data
The beauty of openEHR is that it does not just announce that you need to separate your content from the application and vanish. It provides a very practical approach to query this data using Archetype Query Language. This is like SQL, but on multi-layered models like the ones like a template.


AQL differs from SQL and even querying using FHIR, in that it does not assume to know the structure of the underlying data at query time.

For example, assume that in a General Physical Examination, you want to extract all the different positions the Blood Pressure was recorded in. Using openEHR, a template for General Physical Examination can be created and the blood pressure, along with the position can be included.

A query like the following can be composed to extract that information:

~~~
SELECT                                                       -- Select clause
   o/data[at0001]/.../items[at0004]/value AS systolic,       -- Identified path with alias
   o/data[at0001]/.../items[at0005]/value AS diastolic,
   o/data[at0001]/.../items[at0006]/value AS position,
   c/context/start_time AS date_time
FROM                                                         -- From clause
   EHR[ehr_id/value=$ehrUid]                                 -- RM class expression
      CONTAINS                                               -- containment
         COMPOSITION c                                       -- RM class expression
            [openEHR-EHR-COMPOSITION.encounter.v1]           -- archetype predicate
         CONTAINS
            OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1]
WHERE                                                        -- Where clause
   o/data[at0001]/.../items[at0004]/value/value >= 140 OR    -- value comparison
   o/data[at0001]/.../items[at0004]/value/value <= 100 OR
ORDER BY                                                     -- order by datetime, latest first
   c/context/start_time DESC
~~~

Modelling the same information using FHIR is hard. You'll have to encode the "General Physical Examination" into the Encounter or under an extension under the Observation. The position of measurement is also not standard across FHIR profiles. And querying on extensions may or may not work, depending on the server you are using. FHIR has come up with Questionnaire for solving this issue. However, the fact remains that you will have to map back and forth between the Questionaire response and actual computable FHIR resources. A better alternative would be to use openEHR as the data capture mechanism and then map those to and from FHIR.


