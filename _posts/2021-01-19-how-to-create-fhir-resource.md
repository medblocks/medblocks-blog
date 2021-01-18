---
layout: post
title: How to Create Your First FHIR Resource
subtitle: And Introduction and Setting up your coding environment
tags: [FHIR]
comments: true
---

# What is FHIR and Why should you care?
[FHIR](https://www.hl7.org/fhir/) stands for Fast Health Interoperability Standards and it is a standard for interoperability released by [HL7](https://www.hl7.org/). HL7's v2 messaging format was a huge hit and is used widely to exchange health-related data. It is however, old. And the indiscriminate use of extensions rendered it hard to keep track of what these extensions really mean. And HL7v2 was primarily meant for sending messages across a wire in response to an event. 

We [will not talk](https://www.archetextur.es/why-did-hl7-version-3-fail/) about HL7v3.

FHIR on the other hand, is a solution designed from scratch keeping modern web development practices in mind. Health data is represented as resources and exchanged through multiple paradigms, one of which is a RESTful server.

Take the following clinical content for example:

A 23 year old patient from New York, came with complaints of cough and fever. The blood pressure was 120/80 and the Pulse was 98 per/min. The patient has been reassured that it is the common cold. Paracetamol 500mg SOS has been prescribed. 

Although, it seems like a simple scenario, from the viewpoint of FHIR, this needs to be broken down into resources. In just this scenario, there are at least 6 resources.

1. [Patient](https://www.hl7.org/fhir/patient.html) - 23 years old, from New York
2. [Condition](https://www.hl7.org/fhir/condition.html) (chief complaint) - Cough and Fever
3. [Observation](https://www.hl7.org/fhir/observation.html) - Blood pressure 120/80
4. [Observation](https://www.hl7.org/fhir/observation.html) - Pulse 98/min
5. [Condition](https://www.hl7.org/fhir/condition.html)  (diagnosis) - Common Cold
6. [MedicationRequest](https://www.hl7.org/fhir/medicationrequest.html) - Paracetamol 500mg SOS

The link to each resource will describe further how each resource is structured. 
Now let's start to build your own FHIR resource.

# Setting up VSCode
We'll be working with JSON data directly. Thankfully, FHIR provides a JSON schema to validate resources against. You can also use XML and the XML schema validator. In VSCode you can use the JSON schema to autocomplete fields for you based on the resource type. This comes in very handy. Here are the steps:
1. Download the JSON schema form [here](https://www.hl7.org/fhir/fhir.schema.json.zip).
1. Extract the `fhir.schema.json`.
2. Copy it to a folder where you'll be composing your resources.
3. Open VSCode settings and add the following to the end of your `settings.json` (Ctrl + Shift + P and User settings).

```json
{
    "json.schemas": {
        "fileMatch": [
            "*.fhir.json"
        ],
        "url": "fhir.schema.json"
    }
}
```

**Note:** You can replace `*.fhir.json` with just `*.json`, but that'll trigger the FHIR schema validation for every json you edit.
{: .box-note}


# Creating the Resource
Now let's create our first resource. I explain all the above and how to create a resource more in detail in my video
<div class="youtube-embed-container">
<iframe src="https://www.youtube.com/embed/HdPyV6ggGA4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

That's all for this post. Subscribe to my Youtube channel or RSS feed for updates on new content.