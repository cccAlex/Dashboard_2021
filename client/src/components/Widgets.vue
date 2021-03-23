<template>
    <div id="home">
        <!-- breadcrumb -->
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-mikyored">
                  <a href="#" class="text-gray-700">Widgets</a>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <a href="#" class="text-gray-600">View widgets</a>
                </li>
              </ol>
            </nav>
            <div v-if="error" class="md:grid content-center">
              <div class="bg-red-300 border-l-4 border-red-600 text-orange-dark p-4 mb-8" role="alert">
                  <p class="font-bold">Error</p>
                  <p>There was an error finding this steam profile, try getting your steamID <a href="https://steamidfinder.com/" class="text-mikyored hover:text-red-200">here</a>!</p>
              </div>
            </div>
            <!-- breadcrumb end -->
            <div class="items-center">
              <p class="text-2xl font-semibold mb-2 lg:mb-0">Here are all the widgets available</p>
            </div>

            <div class="pt-10">
              <table class="table-auto w-full content-center" >
                <thead class="bg-gray-50">
                  <tr>
                    <th class="p-4">Widget Name</th>
                    <th>Description</th>
                    <th>Parameter</th>
                    <th>Refresh Rate</th>
                    <th>Add widget</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center bg-white">
                    <td>Covid-19 confirmed cases</td>
                    <td>Graph of covid-19 confirmed cases per country</td>
                    <td><input v-model="covidConfirmedParam" type="text" placeholder="country"></td>
                    <td><input v-model="covidConfirmedRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addCovidConfirmed" class="font-extrabold">+</button></td>
                  </tr>
                  <tr class="text-center bg-gray-50">
                    <td>Covid-19 death cases</td>
                    <td>Graph of covid-19 death cases per country</td>
                    <td><input v-model="covidDeathParam" type="text" placeholder="country"></td>
                    <td><input v-model="covidDeathRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addCovidDeath" class="font-extrabold">+</button></td>
                  </tr>
                  <tr class="text-center bg-white">
                    <td>Covid-19 recovered cases</td>
                    <td>Graph of covid-19 recovered cases per country</td>
                    <td><input v-model="covidRecoveredParam" type="text" placeholder="country"></td>
                    <td><input v-model="covidRecoveredRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addCovidRecovered" class="font-extrabold">+</button></td>
                  </tr>
                  <tr class="text-center bg-gray-50">
                    <td>Weather</td>
                    <td>Access current weather data for any location on Earth</td>
                    <td><input v-model="weatherCurrentParam" type="text" placeholder="city"></td>
                    <td><input v-model="weatherCurrentRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addWeatherCurrent" class="font-extrabold">+</button></td>
                  </tr>
                  <tr class="text-center bg-white">
                    <td>Time</td>
                    <td>Get time information from any location on Earth</td>
                    <td><input v-model="timeParam" type="text" placeholder="city"></td>
                    <td><input v-model="timeRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addTime" class="font-extrabold">+</button></td>
                  </tr>
                  <tr class="text-center bg-gray-50">
                    <td>Steam Profile</td>
                    <td>Get current player information from<a href="https://steamidfinder.com/" class="text-mikyored hover:text-red-200"> steamID64 Dec</a></td>
                    <td><input v-model="steamParam" type="text" placeholder="steamID64 (Dec)"></td>
                    <td><input v-model="steamRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addSteam" class="font-extrabold">+</button></td>
                  </tr>
                  <tr v-if="!imgur.logged_in" class="text-center bg-gray-50">
                    <td>Imgur</td>
                    <td>Login to get access to imgur widget</td>
                    <td><a href="https://api.imgur.com/oauth2/authorize?client_id=9a35bb67c7b7333&response_type=token&state=imgurLogin"><button class="bg-mikyored text-white p-2 rounded-lg">Login to imgur</button></a></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr v-if="imgur.logged_in" class="text-center bg-gray-50">
                    <td>Imgur favorites</td>
                    <td>Get oldest or newest favorites from your account <a :href="'https://imgur.com/user/' + imgur.account_username" class="text-mikyored hover:red-400"> {{ imgur.account_username }} </a></td>
                    <td><select v-model="imgurParam">
                      <option>newest</option>
                      <option>oldest</option>
                      </select></td>
                    <td><input v-model="imgurRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addImgur" class="font-extrabold">+</button></td>
                  </tr>
                  <tr class="text-center bg-gray-50">
                    <td>Exchange Rate</td>
                    <td>View latest exchange rates of any currency</td>
                    <td><input v-model="exchangeRateParam" type="text" placeholder="currency"></td>
                    <td><input v-model="exchangeRateRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addExchangeRate" class="font-extrabold">+</button></td>
                  </tr>
                  <tr class="text-center bg-gray-50">
                    <td>Video Player</td>
                    <td>Play any Youtube video</td>
                    <td><input v-model="videoPlayerParam" type="text" placeholder="video URL"></td>
                    <td><input v-model="videoPlayerRefreshrate" type="number" placeholder="Time in ms"></td>
                    <td><button @click="addVideoPlayer" class="font-extrabold">+</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="items-center pt-10">
              <p class="text-2xl font-semibold mb-2 lg:mb-0">Current widgets</p>
            </div>

            <div class="pt-10">
              <table class="table-auto w-full content-center" >
                <thead class="bg-gray-50">
                  <tr>
                    <th class="p-4">Widget Name</th>
                    <th>Parameter</th>
                    <th>Refresh Rate</th>
                    <th>Remove widget</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center bg-white" v-for="(widget, index) in widgets">
                    <td class="pt-2 pb-2">{{ widget.name }}</td>
                    <td class="pt-2 pb-2">{{ widget.parameter }}</td>
                    <td class="pt-2 pb-2">{{ widget.refreshRate }}</td>
                    <td class="pt-2 pb-2"><button @click="removeWidget(index)" class="font-extrabold">x</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Widgets',
    data() {
        return {
          covidConfirmedParam: '',
          covidConfirmedRefreshrate: '',
          covidDeathParam: '',
          covidDeathRefreshrate: '',
          covidRecoveredParam: '',
          covidRecoveredRefreshrate: '',
          weatherCurrentParam: '',
          weatherCurrentRefreshrate: '',
          timeParam: '',
          timeRefreshrate: '',
          steamParam: '',
          steamRefreshrate: '',
          widgets: [],
          error: false,
          imgur: {},
          imgurParam: '',
          imgurRefreshrate: '',
          exchangeRateParam: '',
          exchangeRateRefreshrate: '',
          videoPlayerParam: '',
          videoPlayerRefreshrate: '',
        }
    },
    methods: {
      addCovidConfirmed() {
        if (this.covidConfirmedParam && this.covidConfirmedRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'Covid.confirmed',
            parameter: this.covidConfirmedParam,
            isDisplayed: false,
            refreshRate: this.covidConfirmedRefreshrate,
            chartOptions: {
              chart: {
                id: '',
                zoom: {
                  enabled: false
                }
              },
              xaxis: {
                tickAmount: 10,
                categories: [],
              },
              title: {
                text: 'Covid-19 confirmed cases in ' + this.covidConfirmedParam,
                align: 'left',
                style: {
                  fontSize: "16px",
                  color: '#666'
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  type: "horizontal",
                  shadeIntensity: 1,
                  gradientToColors: ['#fdd835'],
                  inverseColors: true,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0],
                  colorStops: []
                }
              },
              stroke: {
                width: 4,
                curve: 'smooth',
              }
            },
            chartSeries: [
              {
                name: '',
                data: []
              }
            ],
          })
          this.covidConfirmedParam = '',
          this.covidConfirmedRefreshrate = ''
          this.$store.commit('setWidgets', this.widgets)
        }
      },
      addCovidDeath() {
        if (this.covidDeathParam && this.covidDeathRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'Covid.death',
            parameter: this.covidDeathParam,
            isDisplayed: false,
            refreshRate: this.covidDeathRefreshrate,
            chartOptions: {
              chart: {
                id: '',
                zoom: {
                  enabled: false
                }
              },
              xaxis: {
                tickAmount: 10,
                categories: [],
              },
              title: {
                text: 'Covid-19 death cases in ' + this.covidDeathParam,
                align: 'left',
                style: {
                  fontSize: "16px",
                  color: '#666'
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  type: "horizontal",
                  shadeIntensity: 1,
                  gradientToColors: ['#FD3560'],
                  inverseColors: true,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0],
                  colorStops: []
                }
              },
              stroke: {
                width: 4,
                curve: 'smooth',
              }
            },
            chartSeries: [
              {
                name: '',
                data: []
              }
            ]
          })
          this.covidDeathParam = '',
          this.covidDeathRefreshrate = ''
          this.$store.commit('setWidgets', this.widgets)
        }
      },
      addCovidRecovered() {
        if (this.covidRecoveredParam && this.covidRecoveredRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'Covid.recovered',
            parameter: this.covidRecoveredParam,
            isDisplayed: false,
            refreshRate: this.covidRecoveredRefreshrate,
            chartOptions: {
              chart: {
                id: '',
                zoom: {
                  enabled: false
                }
              },
              xaxis: {
                tickAmount: 10,
                categories: [],
              },
              title: {
                text: 'Covid-19 recovered cases in ' + this.covidRecoveredParam,
                align: 'left',
                style: {
                  fontSize: "16px",
                  color: '#666'
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  type: "horizontal",
                  shadeIntensity: 1,
                  gradientToColors: ['#35fd5d'],
                  inverseColors: true,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0],
                  colorStops: []
                }
              },
              stroke: {
                width: 4,
                curve: 'smooth',
              }
            },
            chartSeries: [
              {
                name: '',
                data: []
              }
            ]
          })
          this.covidRecoveredParam = '',
          this.covidRecoveredRefreshrate = ''
          this.$store.commit('setWidgets', this.widgets)
        }
      },
      removeWidget(index) {
        this.widgets.splice(index, 1)
        this.$store.commit('setWidgets', this.widgets)
      },
      addWeatherCurrent() {
        if (this.weatherCurrentParam && this.weatherCurrentRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'Weather.current',
            parameter: this.weatherCurrentParam,
            isDisplayed: false,
            refreshRate: this.weatherCurrentRefreshrate,
            data: []
          })
          this.weatherCurrentParam = '',
          this.weatherCurrentRefreshrate = ''
          this.$store.commit('setWidgets', this.widgets)
        }
      },
      addTime() {
        if (this.timeParam && this.timeRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'Time',
            parameter: this.timeParam,
            isDisplayed: false,
            refreshRate: this.timeRefreshrate,
            data: []
          })
          this.timeParam = '',
          this.timeRefreshrate = ''
          this.$store.commit('setWidgets', this.widgets)
        }
      },
      async addSteam() {
        if (this.steamParam && this.steamRefreshrate) {
          console.log(process.env.VUE_APP_STEAM_APIKEY)
          await axios.get('https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + process.env.VUE_APP_STEAM_APIKEY + '&format=json&steamids=' + this.steamParam)
          .then(response => {
            console.log(response.data.response)
            if (response.data.response.players.length == 0) {
              this.error = true
              setTimeout(() => {
                this.error = false
              }, 3000);
            } else {
              this.widgets.push({
                id: this.widgets.length,
                name: 'Steam',
                parameter: response.data.response.players[0].personaname,
                steamID64: this.steamParam,
                isDisplayed: false,
                refreshRate: this.steamRefreshrate,
                data: []
              })
              this.steamParam = ''
              this.steamRefreshrate = ''
              this.$store.commit('setWidgets', this.widgets)
            }
          })
          .catch(e => {
            this.error = true
            console.log(e)
            setTimeout(() => {
              this.error = false
            }, 3000);
          })
        }
      },
      addImgur() {
        console.log(this.imgurParam)
        if (this.imgurParam && this.imgurRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'Imgur',
            parameter: this.imgurParam,
            isDisplayed: false,
            refreshRate: this.imgurRefreshrate,
            data: []
          })
          this.imgurParam = '',
          this.imgurRefreshrate = ''
          this.$store.commit('setWidgets', this.widgets)
        }
      },
      addExchangeRate() {
        console.log(this.exchangeRateParam)
        if (this.exchangeRateParam && this.exchangeRateRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'ExchangeRate',
            parameter: this.exchangeRateParam,
            isDisplayed: false,
            refreshRate: this.exchangeRateRefreshrate,
            data: []
          })
          this.exchangeRateParam = '',
          this.exchangeRateRefreshrate = '',
          this.$store.commit('setWidgets', this.widgets)
        }
      },
      youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
      },
      addVideoPlayer() {
        if (this.videoPlayerParam && this.videoPlayerRefreshrate) {
          this.widgets.push({
            id: this.widgets.length,
            name: 'VideoPlayer',
            parameter: "https://www.youtube.com/embed/" + this.youtube_parser(this.videoPlayerParam),
            isDisplayed: false,
            refreshRate: this.videoPlayerRefreshrate,
            data: []
          })
          this.videoPlayerParam = '',
          this.videoPlayerRefreshrate = '',
          this.$store.commit('setWidgets', this.widgets)
        }
      }
    },
    mounted () {
      this.widgets = this.$store.getters.getWidgets
      this.imgur = this.$store.getters.getImgur
      if (!this.imgur.logged_in) {
        if (this.$route.query.state == "imgurLogin") {
          var url = this.$route.hash
          let regex= /[#?&]([^=#]+)=([^&#]*)/g, params = {}, match;
          while (match = regex.exec(url))
            params[match[1]] = match[2];
          var imgur = {
            logged_in: true,
            access_token: params.access_token,
            account_id: params.account_id,
            account_username: params.account_username,
            refresh_token: params.refresh_token,
          }
          this.$store.commit('setImgur', imgur)
        }
      }
    }
}
</script>
