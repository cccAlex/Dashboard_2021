<h1 align="center">Welcome to Dashboard 👋</h1>
<p><img alt="Version" src="https://img.shields.io/badge/npm-v1.0-green"> <img alt="Version" src="https://img.shields.io/badge/docker-compose-blue">
 <img alt="Version" src="https://img.shields.io/badge/mongo-db-green"> <img alt="Version" src="https://img.shields.io/badge/express-js-lightgrey">
 <img alt="Version" src="https://img.shields.io/badge/vue-js-green"> <img alt="Version" src="https://img.shields.io/badge/node-js-green">
</p>

> Creating a dashboard web service with the MEVN stack (mongoDB, expressJS, vueJS, nodeJS) 

## Before installing

```sh
# Clone the repository
git clone git@github.com:EpitechIT2020/B-DEV-500-PAR-5-1-cardgames-damien.chan.git
# Make sure to create 2 .env files, one in /client the other one in /server

# .env in client
cat /client/.env
VUE_APP_STEAM_APIKEY= [your key]
VUE_APP_ABSTRACT_APIKEY= [your key]
VUE_APP_OPENWEATHERMAP_APIKEY= [your key]
VUE_APP_IMGUR_APIKEY= [your imgur client key]

# .env in server
cat /server/.env
DATABASE_URI= [your mongodb db uri]
JWT_KEY= [your jwt key]
FACEBOOK_API= [your facebook api link]
```


<p>Docker and docker-compose are required, install them <a href="https://docs.docker.com/get-docker/">here</a></p>

## Installing and running client

```sh
docker-compose up --build
```

## Accessing the dashboard

<p>You can access the dashboard on the address https://localhost:8081/</p>

## Services
<p>We currently have 5 services: </p>
<ol>
<li>covid-19</li>
<li>weather</li>
<li>time</li>
<li>steam</li>
<li>imgur</li>
<li>currency exchange rates<li>
<li>youtube video player<li>
</ol>

## Widgets
### [COVID] confirmed cases graph
#### Display a graph of confirmed cases for a specific country since the beginning of the pandemic

![image](https://user-images.githubusercontent.com/71386489/100525428-1d013680-31c1-11eb-93fb-f74dec074694.png)

### [COVID] death cases graph
#### Display a graph of death cases for a specific country since the beginning of the pandemic

![image](https://user-images.githubusercontent.com/71386489/100525567-250da600-31c2-11eb-8ff0-7f3db3cd0f25.png)

### [COVID] recovered cases graph
#### Display a graph of recovered cases for a specific country since the beginning of the pandemic

![image](https://user-images.githubusercontent.com/71386489/100525575-38b90c80-31c2-11eb-9c49-86f23579453a.png)

### [WEATHER] current weather
#### Display a the current weather for a specific location

![image](https://user-images.githubusercontent.com/71386489/100525617-79b12100-31c2-11eb-8517-d94f2a7a1c8a.png)

### [Time] current time
#### Display a the current time for a specific location

![image](https://user-images.githubusercontent.com/71386489/100525629-a06f5780-31c2-11eb-8fab-f4ad2957e3c3.png)

### [Steam] steam profile status
#### Display a the current status for a specific user (parameter: steamID64)
<p>You can get your steamID64 from <a href="https://steamidfinder.com/">here</a></p>

![image](https://user-images.githubusercontent.com/71386489/100525678-f512d280-31c2-11eb-8048-9a59640f1688.png)
![image](https://user-images.githubusercontent.com/71386489/100525690-0bb92980-31c3-11eb-978f-a1fddb596a03.png)
![image](https://user-images.githubusercontent.com/71386489/100525704-1f649000-31c3-11eb-8187-e4ac74ed6cc9.png)

### [Imgur] profile favourites
#### Display newest or oldest favourite image from account
<p> You need to login to your imgur account first to have access to this widget</p>

![image](https://user-images.githubusercontent.com/71386489/100544707-ce52ab80-3257-11eb-83d5-c30c5c7d7644.png)
![image](https://user-images.githubusercontent.com/71386489/100544625-68feba80-3257-11eb-81b4-4268b7e4c921.png)
![image](https://user-images.githubusercontent.com/71386489/100544639-7e73e480-3257-11eb-9f1b-3cebc2d6339d.png)

### [Exchange Rate]
#### Display current up to date currency exchange rates

![image](https://user-images.githubusercontent.com/67512526/103489631-3592eb00-4e16-11eb-99bd-e5045b853a57.png)

### [Youtube Video Player]
#### Watch Youtube Videos straight from your Dashboard
<p> Just insert a Youtube Video URL when creating your widget to start watching</p>

![image](https://user-images.githubusercontent.com/67512526/103489604-04b2b600-4e16-11eb-9057-ac6516824c19.png)

## How to add a widget?
> Go to https://localhost:8081/widgets or you can click here

![image](https://user-images.githubusercontent.com/71386489/100527253-0b278f80-31d1-11eb-86f2-2dd3b0a589d2.png)

> Enter a parameter value and a refreshRate (time for each widgets to refresh) and press +

![image](https://user-images.githubusercontent.com/71386489/100527259-209cb980-31d1-11eb-9ce8-49a0360e4f80.png)

> Here are all the parameters for the widgets
```javascript
  covidConfirmed: {
    parameter_type: String,
    parameter: Country,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  covidDeath: {
    parameter_type: String,
    parameter: Country,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  covidRecovered: {
    parameter_type: String,
    parameter: Country,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  weatherCurrent: {
    parameter_type: String,
    parameter: City,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  time: {
    parameter_type: String,
    parameter: City,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  steam: {
    parameter_type: String,
    parameter: steamID64,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  imgur: {
    parameter_type: String,
    parameter: oldest/newest,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  exchangeRate: {
    parameter_type: String,
    parameter: currency,
    refresh_rate_type: Int,
    refresh_rate: Number,
  },
  videoPlayer: {
    parameter_type: String,
    parameter: videoURL,
    refresh_rate_type: Int,
    refresh_rate: Number,
  }
```
<p>You can get your steamID64 from <a href="https://steamidfinder.com/">here</a></p>

> Once you configured all your widgets you can go back to the dashboard (https://localhost:8081/dashboard)
> You can add the widget to the dashboard with these buttons

![image](https://user-images.githubusercontent.com/71386489/100527366-2cd54680-31d2-11eb-95c2-895c89a02bb2.png)

> You can change the order of display of all your widgets here

![image](https://user-images.githubusercontent.com/71386489/100527378-44acca80-31d2-11eb-9ccc-e46ecf6ef9ea.png)

> Voila ! You made it, you added your first widgets !

![image](https://user-images.githubusercontent.com/71386489/100527414-9bb29f80-31d2-11eb-99af-d3324635beeb.png)


## Author

👤 **Alexandre - Damien**

* Github: [@cccAlex](https://github.com/cccAlex)
* Github: [@damckw](https://github.com/damckw)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
