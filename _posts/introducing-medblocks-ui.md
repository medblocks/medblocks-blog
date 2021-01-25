---
layout: post
title: Introducing Medblocks UI
subtitle: An open-source component library for openEHR based interfaces.
thumbnail-img: /assets/blog/.png
tags: ["medblocks", "openEHR"]
---
# Introduction
It is a common need to automatically generate forms from openEHR templates. A well known example is the Better EHR Studio. It offers a Form Builder and an AQL Builder. However, there is no open-source alternative especially for low resource enviroments where paying an expensive openEHR provider is not affordable.

I have been working on this problem for a while, and today I'm happy to announce [Medblocks UI]() under the Apache 2 license.

The app is also availabe at this site: https://sidharthramesh.github.io/medblocks-ui/

# Tutorial
## Create template
The first step is to create a template. We'll be using the Archetype Designer. We'll be creating an Initial Assesment Template with the Glasgow Coma Scale, and Pulse of the patient.

For this template, we need the following archetypes:
- Encounter - https://ckm.openehr.org/ckm/archetypes/1013.1.120/export
- Glasgow Coma Scale(GCS) - https://ckm.openehr.org/ckm/archetypes/1013.1.137/export
- Pulse/Heart beat - https://ckm.openehr.org/ckm/archetypes/1013.1.4295/export

Click on Export ADL for the above archetypes and upload it in the Archetype Designer.

Fist we'll create a new template and inherit from the encounter archetype.

Next, we'll add the Glasgow coma scale and Pulse archetypes to the composition. We'll be excluding most of the attributes, but a few like so:

<!-- TODO: Add Images -->
Once this is done, you can click on Export and download the file as a web template. Be sure to also export as OPT for publishing the template to am openEHR Clinical Data Repository.

## Upload web template
Once the web template is ready, open the Medblocks UI website at: https://sidharthramesh.github.io/medblocks-ui/#/settings. Click on the Add template button and upload the webtemplate that you just got from the previous step.

If all goes well, your template should show up like so:
<!-- Add image -->

Click on Data entry on the top of the page. You can see that your template now shows up in the tab. Click on the "Initial assesment" tab, and you have an automatically generated form.
<!-- Add image -->

You can play around with the form on the left side and you'll see that they generate a composition on the right side. This composition can be committed to an openEHR CDR after the template has been uploaded.

## Customize
You might have noticed that in the form, there are a few repetitive fields that are not interactable. This is because the Archetype Designer gives an input for entering the null_flavor as type DV_CODED_TEXT and our form renders that. Let's first get rid of that.

In the settings, click on Customize.

Render - false

Conditional rendering of pulse - 
```js
(data) => {
    if (data["path"]) {
        return true
    }
    return false
}
```
Computed values - 
```js
(data) => {
    if (
    data["initial_assesment/glasgow_coma_scale_gcs:0/best_eye_response_e/value|ordinal"] 
    && data["initial_assesment/glasgow_coma_scale_gcs:0/best_verbal_response_v/value|ordinal"] 
    && data["initial_assesment/glasgow_coma_scale_gcs:0/best_motor_response_m/value|ordinal"]) {
        return data["initial_assesment/glasgow_coma_scale_gcs:0/best_eye_response_e/value|ordinal"] 
        + data["initial_assesment/glasgow_coma_scale_gcs:0/best_verbal_response_v/value|ordinal"] 
        + data["initial_assesment/glasgow_coma_scale_gcs:0/best_motor_response_m/value|ordinal"]
    }
}
```

# Future direction
- Add support for more data types.
- Integrated SNOMED CT terminology searches.
- Compile into web-components and publish to npm, with a guide for all major frameworks.
- 

Feel free to [raise an issue ](https://github.com/sidharthramesh/medblocks-ui/issues) for bugs and feature requests.