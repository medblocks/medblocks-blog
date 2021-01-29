---
layout: post
title: Setting up a SNOMED CT Terminology Server 
subtitle: Using Docker and Hermes by @wardle
thumbnail-img: /assets/blog/snomed-logo.png
share-img: /assets/blog/snomed-logo.png
tags: ["SNOMED"]
comments: true
---
**Credits:** All of the heavy lifting is done by [Hermes](https://github.com/wardle/hermes), an open-source Clojure library for exploring SNOMED CT terminologies. Big shout out to [Mark Wardle](https://twitter.com/mwardle) for the great work! You can check out his blog on clinical informatics [here](https://wardle.org/). Lot's of cool stuff!

# Pre-requisites:
1. Get the SNOMED CT files from your National Release Center or [MLDS](https://mlds.ihtsdotools.org/)
2. Download and install docker and docker-compose. (Or you can use Java with the `jar`, but I strongly recommend docker.)

# Instructions:



First, Clone [my fork](https://github.com/sidharthramesh/hermes) of Hermes into a folder called `hermes`. Technically, you only need the `Caddyfile`, `docker-compose.yml`, and `index.sh`.

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

Index your SNOMED CT files. This step requires a lot of compute and will take some time (20 mins - 1 hour). Make sure your system has enough memory. 

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

The indexed files are now in the `snomed.db` folder. Good news is, you can just send this folder to another system and the next command will still work. The reason I had to write all the above instructions is due to the SNOMED Licensing policy. Once you have your `snomed.db`, you can send it (compress before sending) to another server or even include it in a docker containr for setting up things in the cloud faster.

Start the server with `docker-compose up`.


You should now have a terminology server running at [http://localhost:8080](http://localhost:8080). 

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