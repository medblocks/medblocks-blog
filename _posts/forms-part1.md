---
layout: post
title: Building Patient Registration Forms on FHIR - Part 1
subtitle: Using FHIR Server and Docker
thumbnail-img: /assets/blog/fhir-logo.png
share-img: /assets/blog/fhir-logo.png
tags: ["FHIR"]
comments: true
---
# About this blog:
### The purpose of this blog is to shown how an EHR is built from scratch .


All the below will be done using just a fhir server and there is no other intermediary server that’s storing all the patient records,In this Blog series we will be seeing how to talk to a fhir server which has patient information getting it back.


## Difference between a traditional system to do the task and using a FHIR to do same task :

1.Using FHIR, it is FHIR FIRST which means, you are creating all the patient resources directly on the front end and then you are persisting them on a fire server. This technique has a lots of advantages of which one of them being, most cloud providers like Azure, AWS  provide FHIR as a service and as an API so you don’t have to worry about managing the data and confidentiality of the data.

2. Most of the times you don’t have control over the database as you may be developing an application on top of an existing EHR like cerner or epic or all scripts and they provide you with a smart on fire interface and you application will talk in fhir.

# Pre-requisites:

1. Download and install [Docker ](https://www.docker.com/).
2. Install Docker Compose.
3. Install Latest [Node version](https://nodejs.org/en/)


# Setup in VScode:



## 1. Installing  ViteJS and other technologies:

Vite is a modern type of bundler,it’s really fast in deploying things because it bundles them as  ES modules.

```
npm init@vitejs/app 
Project name: fhir-demographics 

Svelte
Svelte-ts 

Cd fhir-demographics 
npm install

npm install -D tailwindcss@latest postcss@latest  autoprefixer@latest
npx tailwindcss init -p

```
All these installations are development dependencies so it will not be problem while deployment.

First we need a fhir api  so we make a docker compose file and named it docker-compose.yml

docker-compose.yml
```docker-compose.yml
Services:
fhir:
	    image: "hapiproject/hapi:v5.3.0"
    ports:
          -“8090:8080” 
	    environment:
	      spring.datasource.url: "jdbc:postgresql://fhir-db:5432/hapi_r4"
	      spring.datasource.username: admin
	      spring.datasource.password: admin
	      spring.datasource.driverClassName: org.postgresql.Driver
	      hapi.fhir.subscription.resthook_enabled: "true"
	      hapi.fhir.subscription.websocket_enabled: "true"
	      hapi.fhir.client_id_strategy: ANY
	  fhir-db:
	    image: postgres
	    volumes:
	      - fhir-db-data:/var/lib/postgresql/data
	    environment:
	      POSTGRES_PASSWORD: admin
	      POSTGRES_USER: admin
	      POSTGRES_DB: hapi_r4
volumes:
   
    fhir-db-data:

```

Services – Diferent containers running inside our docker environment ,so we have fhir and fhir-db, and this is a hapi fhir server running.

Volumes – gives the ability to persist all of the data.


Terminal
```Terminal

docker-compose up


```
The fhir instance will start running at port 8090.



## 2. Installing MEDBLOCKS-UI

### Medblocks has developed a package called medblocks UI,which makes it very easy to develop forms on health care applications.

Medblocks-UI is basically a collection of web components.

New Terminal
```
 npm install medblocks-ui

```

App.svelte 
```

import `@shoelace-style/shoelace/dist/themes/base.css`
import 'medblocks-ui'

```

### At the end of the day we need patient data generated at the front end and also we need edit the data.
 
## step 1: creating a form

App.svelte
```
<script lang="ts">
import 'medblocks-ui';
import `@shoelace-style/shoelace/dist/themes/base.css`;
import "/tailwind.css";


function handleSubmit(e: any ){
  console.log(e.target.data);
  console.log(e.detail);
}
  
</script>

<h1 class="text-2xl font-semibold">Patient Registration</h1>

<mb-fhir-form class=" flex flex-col gap-3" on:submit={handleSubmit}>

  <mb-context path="resourcetype" data="Patient"></mb-context>
  <mb-input path="name[0].given" label="name"></mb-input>
  <mb-date label="Date of birth" path="birthDate" />
  <mb-buttons datatype="code" label="Gender" path="gender">
    <mb-option value="male" label="Male" />
    <mb-option value="female" label="Female" />
    <mb-option value="other" label="Other" />
  </mb-buttons>
  <mb-submit>
    <sl-button type="info">Submit</sl-button>
  </mb-submit>

</mb-fhir-form>

```

create a new file and name it tailwind.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```
### Code Explaination:
1. mb fhir form in med blocks ui is used here to generate fhir resources directly.In mb-context, you have something called path and path is where you want the data element to bind to. It will output if something Is present in that path.We have created our own data points with these paths.

2. Added a submit button ,We are using  sl-button which a web component built using shoelace but this also be done in bootstrap.Submit button clicking it emits an event called submit ,so it will emit it on the mb fhir form, Internally the mb-fhir form does some serializations to get the detail out.

On filling out the detail for the patient and pressing submit you will get a complete fhir resource.

## step 2: Post it to a server

As soon as we get the information, we need to post this to the server.

We need axios to communicate with fhir api.
We need to define which url we are going to talk to the server.
```
npm install axios 

```
 
App.svelte 
```
<script lang="ts">
import 'medblocks-ui';
import `@shoelace-style/shoelace/dist/themes/base.css`;
import "/tailwind.css";
let loading =false;

import axios from "axios";

async function handleSubmit(e: any ){
  const r= await axios.post("http://localhost:8090/fhir/Patient",e.detail)

 console.log(r.data)
}
  
</script>

<h1 class="text-2xl font-semibold">Patient Registration</h1>

<mb-fhir-form class=" flex flex-col gap-3" on:submit={handleSubmit}>

  <mb-context path="resourcetype" data="Patient"></mb-context>
  <mb-input path="name[0].given" label="name"></mb-input>
  <mb-date label="Date of birth" path="birthDate" />
  <mb-buttons datatype="code" label="Gender" path="gender">
    <mb-option value="male" label="Male" />
    <mb-option value="female" label="Female" />
    <mb-option value="other" label="Other" />
  </mb-buttons>
  <mb-submit>
    <sl-button {loading} type="info">Submit</sl-button>
  </mb-submit>

</mb-fhir-form>

```

```
npm run dev 
```
Filling up the form and upon ssubmitting, we will be able to post it to the FHIR server.





A video version of this tutorial is available here:
<div class="youtube-embed-container">
<iframe src="https://www.youtube.com/watch?v=pCp7O5OptzY&t=135s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

