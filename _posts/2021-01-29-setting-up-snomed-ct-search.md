---
layout: post
title: Setting up a SNOMED CT Terminology Server 
subtitle: Using Docker and Hermes by @wardle
thumbnail-img: /assets/blog/snomed-logo.png
share-img: /assets/blog/snomed-logo.png
tags: ["SNOMED"]
comments: true
---
# Pre-requisites:
1. Get the SNOMED CT files from your National Release Center or [MLDS](https://mlds.ihtsdotools.org/)
2. Download and install docker and docker-compose. (Or you can use Java with the `jar`, but I strongly recommend docker.)

# Instructions:
First, Clone my fork of Hermes ([original repo](https://github.com/wardle/hermes)) found here: [https://github.com/sidharthramesh/hermes/tree/master](https://github.com/sidharthramesh/hermes) into a folder called `hermes`.

Now, extract the SNOMED CT release files into a folder called `snomed` inside the `hermes` directory.

Your hermes directory should look something like this:

```sh
hermes
├── snomed
│   ├── SnomedCT_IndiaDrugExtensionRF2_PRODUCTION_IN1000189_20200828T120000Z
│   │   ├── Delta
│   │   ├── Full
│   │   ├── Readme_en_20200828.txt
│   │   └── Snapshot
│   └── SnomedCT_InternationalRF2_PRODUCTION_20200731T120000Z
│       ├── Delta
│       ├── Full
│       ├── Readme_en_20200731.txt
│       ├── Snapshot
│       └── release_package_information.json
├── Caddyfile
├── Dockerfile
├── LICENSE
├── README.md
├── deps.edn
├── docker-compose.yml
├── index.sh
├── resources
├── src
└── test
```

Index your SNOMED CT files:

```sh
chmod +x ./index.sh
./index.sh
```

For some reason if you're unable to use the script, execute these commands in order:

```sh
docker-compose run hermes java -jar target/hermes-full-v0.1.0.jar -d /db/snomed.db import /db/snomed
docker-compose run hermes java -jar target/hermes-full-v0.1.0.jar -d /db/snomed.db index
docker-compose run hermes java -jar target/hermes-full-v0.1.0.jar -d /db/snomed.db compact
```

Run `docker-compose up`.

You should have a terminology server running at [http://localhost:8080](http://localhost:8080). 

Let's test the server by searching. You can change the `s` (search term), `constraint` ([ECL constraint](https://confluence.ihtsdotools.org/display/DOCECL)) and `maxHits` values.

```sh
curl "http://localhost:8080/v1/snomed/search?s=Head&constraint=<64572001&maxHits=3" -H "Accept: application/json"
```

You should get a JSON response like:

```json
[
    {
        "id": 140467011,
        "conceptId": 84727000,
        "term": "Big head",
        "preferredTerm": "Osteitis fibrosa cystica"
    },
    {
        "id": 200997013,
        "conceptId": 82272006,
        "term": "Head cold",
        "preferredTerm": "Common cold"
    },
    {
        "id": 504583010,
        "conceptId": 81000006,
        "term": "Head lice",
        "preferredTerm": "Pediculosis capitis"
    }
]
```

{: .box-note}
**Alternative:** If you want to just run Hermes with Java, you can find the `jar` [here](https://github.com/sidharthramesh/hermes/releases/download/0.1.0/hermes-full-v0.1.0.jar). However, note that CORS is not enabled by default, so if you're searching from a front end application, you'll need to set that up yourself by setting up a reverse proxy like I have done using caddy. You can also just download the docker image of a pre-build hermes at [dockerhub](https://hub.docker.com/r/tornadoalert/hermes) or pull directly using `docker pull tornadoalert/hermes`