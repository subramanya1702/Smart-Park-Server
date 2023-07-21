## Smart-Park-Server

A node js application that provides information about all available parking lots through its REST APIs.

### Requirements

* Node >= 14.0.0
* Mongodb >= 6.0.0
* Docker

### Setting up Mongodb
#### Without Docker
1. Install and run mongodb by following the instructions over [here](https://www.mongodb.com/docs/manual/installation/)

#### With Docker
1. Download the mongodb image

```sh
docker pull mongo:6.0
```

2. Run a container using the above image

```sh
docker run -dp 27017:27017 --name mongo mongo:6.0
```

### Installation

1. Clone the repository

```sh
git clone git@github.com:subramanya1702/Smart-Park-Server.git
```

2. Navigate to the project directory

```sh
cd Smart-Park-Server
```

### Usage

#### Without Docker

1. Install dependencies

```sh
npm install
```

2. Run the application

```sh
npm run start:{profile}
```

The profile can be dev, prod or test

#### With Docker

1. Build/create an image

```sh
docker build -t spserver .
```

2. Run a container with the above image

```sh
docker run -dp {port}:{port} --env DB_CONN_STR={MONGO_CONNECTION_STRING} --env HOSTNAME={NODE_JS_SERVER_HOSTNAME} --name spserver spserver 
```

DB_CONN_STR is an optional environment variable that has to be passed when the node js application and database are running on different
servers.
If not, it can be skipped.
Example:

* Using database server's DNS: `DB_CONN_STR=db.domain.com:{port}`
* Using database server's public/external IP: `DB_CONN_STR=x.x.x.x:{port}`

HOSTNAME is an optional environment variable that has to be passed if the application is being run in prod mode.
If the application is running in dev mode, it can be skipped.
Example:

* Using node js server's DNS: `HOSTNAME=njs.domain.com`
* Using node js server's public/external IP `HOSTNAME=x.x.x.x`

### API Documentation

#### Request

`GET /parking_lots`

```sh
curl http://localhost:8080/parking_lots
```

#### Response

```sh
HTTP/1.1 200 OK
Date: Mon, 17 Jul 2023 18:13:00 IST
Status: 200 OK
Content-Type: application/json

{
    "data": [
        {
            "latitude": "44.56298278509426",
            "longitude": "-123.27235573138302",
            "parking_lot_name": "Tebeau Hall",
            "number_of_empty_parking_slots": 26,
            "total_number_of_parking_lots": 41,
            "timestamp": 1689686934,
            "image_url": "http://localhost:8080/parking_lots/64b6939ddb1963c3c317dd20/image",
            "parking_lot_time_limit": "2 Hr Parking [ 8.30 am to 5.30 am]",
            "parking_charges": 2
        }
    ]
}
```

#### Request

`GET /parking_lots/{parking_lot_id}/image`

```sh
curl -o image.png http://localhost:8080/parking_lots/{parking_lot_id}/image
```

#### Response

```sh
HTTP/1.1 200 OK
Date: Mon, 17 Jul 2023 18:17:00 IST
Status: 200 OK
Content-Type: image/jpeg
```

### Contributors

Subramanya Keshavamurthy [keshavas@oregonstate.edu](mailto://keshavas@oregonstate.edu)
