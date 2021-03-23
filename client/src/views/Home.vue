<template>
    <div id="home">
        <!-- breadcrumb -->
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-mikyored">
                  <a href="#" class="text-gray-700">Main</a>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <a href="#" class="text-gray-600">Dashboard</a>
                </li>
              </ol>
            </nav>
            <!-- breadcrumb end -->

            <div class="lg:flex justify-between items-center mb-6">
              <p class="text-2xl font-semibold mb-2 lg:mb-0">Good afternoon, {{ userData.username }}!</p>
            </div>

            <p class="text-2xl font-semibold mb-2 lg:mb-0">Widgets</p>
            <div v-if="error" class="md:grid content-center">
              <div class="bg-red-300 border-l-4 border-red-600 text-orange-dark p-4 mb-8" role="alert">
                  <p class="font-bold">Error</p>
                  <p>There was an error with this widget, try deleting and creating it again!</p>
              </div>
            </div>

            <div class="flex justify-start mt-4">
            <draggable class="dragArea list-group flex-initial" :list="widgets" @change="saveWidgetChanges">
              <div
                class="list-group-item text-white bg-mikyored m-1 p-3 rounded-md text-center hover:bg-red-400"
                v-for="element in widgets"
                :key="element.name">
                  <template v-if="!element.isDisplayed">
                    ❌ {{ element.name }} - {{ element.parameter }}
                  </template>
                  <template v-else>
                    ✔️ {{ element.name }} - {{ element.parameter }}
                  </template>
              </div>
            </draggable>

            <div class="flex-initial m-1" v-for="(widget, index) in widgets">
              <template v-if="!widget.isDisplayed && (widget.name == 'Covid.confirmed' || widget.name == 'Covid.death' || widget.name == 'Covid.recovered') ">
                <button class="bg-gray-800 text-white rounded-md p-3" @click="covidConfirmed(index)"> ➕ {{widget.name}} for {{widget.parameter}}</button>
              </template>
              <template v-if="!widget.isDisplayed && widget.name == 'Weather.current'">
                <button class="bg-gray-800 text-white rounded-md p-3" @click="weatherCurrent(index)"> ➕ {{widget.name}} for {{widget.parameter}}</button>
              </template>
              <template v-if="!widget.isDisplayed && widget.name == 'Time'">
                <button class="bg-gray-800 text-white rounded-md p-3" @click="getTime(index)"> ➕ {{widget.name}} for {{widget.parameter}}</button>
              </template>
              <template v-if="!widget.isDisplayed && widget.name == 'Steam'">
                <button class="bg-gray-800 text-white rounded-md p-3" @click="querySteam(index)"> ➕ {{widget.name}} for {{widget.parameter}}</button>
              </template>
              <template v-if="!widget.isDisplayed && widget.name == 'Imgur'">
                <button class="bg-gray-800 text-white rounded-md p-3" @click="getImgur(index)"> ➕ {{widget.name}} for {{widget.parameter}}</button>
              </template>
              <template v-if="!widget.isDisplayed && widget.name == 'ExchangeRate'">
                <button class="bg-gray-800 text-white rounded-md p-3" @click="getExchangeRate(index)"> ➕ {{widget.name}} for {{widget.parameter}}</button>
              </template>
              <template v-if="!widget.isDisplayed && widget.name == 'VideoPlayer'">
                <button class="bg-gray-800 text-white rounded-md p-3" @click="getVideoPlayer(index)"> ➕ {{widget.name}} for {{widget.parameter}}</button>
              </template>
            </div>
            </div>

            <div v-for="(widget, index) in widgets">
              <template v-if="widget.name == 'Covid.confirmed' && widget.isDisplayed">
                <div class="flex flex-wrap -mx-3">
                  <apexchart width="900" type="line" :options="widget.chartOptions" :series="widget.chartSeries"></apexchart>
                </div>
              </template>
              <template v-if="widget.name == 'Covid.death' && widget.isDisplayed">
                <div class="flex flex-wrap -mx-3">
                  <apexchart width="900" type="line" :options="widget.chartOptions" :series="widget.chartSeries"></apexchart>
                </div>
              </template>
              <template v-if="widget.name == 'Covid.recovered' && widget.isDisplayed">
                <div class="flex flex-wrap -mx-3">
                  <apexchart width="900" type="line" :options="widget.chartOptions" :series="widget.chartSeries"></apexchart>
                </div>
              </template>
              <template v-if="widget.name == 'Weather.current' && widget.isDisplayed">
                <p class="text-2xl font-semibold mb-2 lg:mb-0">Current weather in {{ widget.parameter }}</p>

                <div class="text-white mb-8">
                  <div class="font-sans w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-4">
                    <div class="flex items-center justify-between px-6 py-8">
                      <div class="flex items-center">
                        <div>
                          <div class="text-6xl font-semibold">{{ (widget.data.main.temp - 273.15).toFixed(0) }}°C</div>
                          <div class="text-xs mt-5">Feels like {{ (widget.data.main.feels_like - 273.15).toFixed(0) }}°C</div>
                        </div>
                        <div class="mx-5">
                          <div class="font-semibold">{{ widget.data.weather[0].main }}</div>
                          <div>{{ widget.data.name }}, {{ widget.data.sys.country }}</div>
                        </div>
                        </div>
                      <div><img :src="'http://openweathermap.org/img/wn/' + widget.data.weather[0].icon + '@2x.png'"/></div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="widget.name == 'Time' && widget.isDisplayed">
                <p class="text-2xl font-semibold mb-2 lg:mb-0">Current time in {{ widget.parameter }}</p>
                <div class="text-white mb-8">
                  <div class="font-sans w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-4">
                    <div class="text-xl mt-5 pl-4">Datetime : {{ widget.data.datetime }}</div>
                    <div class="text-xl mt-5 mb-5 pl-4">Location : {{ widget.data.timezone_location }}, {{ widget.data.timezone_abbreviation }}</div>
                  </div>
                </div>
              </template>
              <template v-if="widget.name == 'Steam' && widget.isDisplayed">
                <p class="text-2xl font-semibold mb-2 lg:mb-0">Steam profile for {{ widget.parameter }} (steamID64 : {{widget.steamID64}})</p>
                <div class="grid grid-rows-3 grid-flow-col bg-gray-900 w-2/4 rounded-lg shadow-lg mt-4 text-white">
                  <div class="row-span-3 m-4"><a :href="widget.data.profileurl"><img :src="widget.data.avatarfull" class="w-32 h-32 rounded-full"/></a></div>
                  <div class="col-span-2 pt-4 font-bold">{{ widget.data.personaname }}</div>
                  <div v-if="!widget.data.gameextrainfo && widget.data.personastate == 0" class="row-span-2 col-span-2 overflow-auto text-gray-400">Offline</div>
                  <div v-if="!widget.data.gameextrainfo && widget.data.personastate == 1" class="row-span-2 col-span-2 overflow-auto text-green-400">Online</div>
                  <div v-if="!widget.data.gameextrainfo && widget.data.personastate == 2" class="row-span-2 col-span-2 overflow-auto text-mikyored">Busy</div>
                  <div v-if="!widget.data.gameextrainfo && widget.data.personastate == 3" class="row-span-2 col-span-2 overflow-auto text-yellow-500">Away</div>
                  <div v-if="!widget.data.gameextrainfo && widget.data.personastate == 4" class="row-span-2 col-span-2 overflow-auto text-yellow-500">Snooze</div>
                  <div v-if="!widget.data.gameextrainfo && widget.data.personastate == 5" class="row-span-2 col-span-2 overflow-auto text-blue-400">Looking to trade</div>
                  <div v-if="!widget.data.gameextrainfo && widget.data.personastate == 6" class="row-span-2 col-span-2 overflow-auto text-blue-400">Looking to play</div>
                  <div v-if="widget.data.gameextrainfo" class="row-span-2 col-span-2 overflow-auto">Playing <a :href="'https://store.steampowered.com/app/' + widget.data.gameid"><p class="text-blue-400">{{ widget.data.gameextrainfo }}</p></a></div>
                </div>
              </template>
              <template v-if="widget.name == 'Imgur' && widget.isDisplayed">
                <p class="text-2xl font-semibold mb-2 lg:mb-0">Current {{widget.parameter}} favorite for account {{ imgur.account_username }}</p>
                <p v-if="widget.parameter == 'oldest' && widget.data.length > 0" class="text-2sm font-semibold mb-2 lg:mb-0">by imgur u/<a :href="'https://imgur.com/user/' + widget.data[widget.data.length - 1].account_url" class="text-mikyored hover:text-red-400">{{widget.data[widget.data.length - 1].account_url}}</a></p>
                <p v-if="widget.parameter == 'newest' && widget.data.length > 0" class="text-2sm font-semibold mb-2 lg:mb-0">by imgur u/<a :href="'https://imgur.com/user/' + widget.data[0].account_url" class="text-mikyored hover:text-red-400">{{widget.data[0].account_url}}</a></p>
                <div class="text-white mb-8">
                  <div class="font-sans w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-4">
                    <a v-if="widget.parameter == 'oldest' && widget.data.length > 0" :href="widget.data[widget.data.length - 1].link"><img  :src="widget.data[widget.data.length - 1].images[0].link" class="w-full h-full"/></a>
                    <a v-if="widget.parameter == 'newest' && widget.data.length > 0" :href="widget.data[0].link"><img :src="widget.data[0].images[0].link" class="w-full h-full"/></a>
                    <div v-if="widget.data.length == 0" class="text-xl mt-5 pl-4 mb-5">Your account has no favourites</div>
                  </div>
                </div>
              </template>
              <template v-if="widget.name == 'ExchangeRate' && widget.isDisplayed">
                <p class="text-2xl font-semibold mb-2 lg:mb-0">Exchange Rates from {{ widget.parameter }}</p>
                <div class="text-white mb-8">
                  <div class="font-sans w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-4">
                    <div class="text-xl mt-5 pl-4"><i class="fa fa-dollar" style="font-size:24px"></i> USD : {{ widget.data.rates.USD }}</div>
                    <div class="text-xl mt-5 pl-4"><i class="fa fa-euro" style="font-size:24px"></i> EUR : {{ widget.data.rates.EUR }}</div>
                    <div class="text-xl mt-5 pl-4"><i class="fa fa-gbp" style="font-size:24px"></i> GBP : {{ widget.data.rates.GBP }}</div>
                    <div class="text-xl mt-5 pl-4"><i class="fa fa-jpy" style="font-size:24px"></i> JPY : {{ widget.data.rates.JPY }}</div>
                    <div class="text-xl mt-5 pl-4"><i class="fa fa-cny" style="font-size:24px"></i> CNY : {{ widget.data.rates.CNY }}</div>
                  </div>
                </div>
              </template>
              <template v-if="widget.name == 'VideoPlayer' && widget.isDisplayed">
                <p class="text-2xl font-semibold mb-2 lg:mb-0">Video Player {{ widget.index }}</p>
                <div class="text-white mb-8">
                  <div class="font-sans w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-4">
                    <iframe width="560" height="400" :src="widget.parameter"></iframe>
                  </div>
                </div>
              </template>
            </div>

    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { VueDraggableNext } from 'vue-draggable-next'

export default {
    name: 'DashboardHome',
    components: {
      draggable: VueDraggableNext,
    },
    data() {
      return {
        userData: [],
        widgets: [],
        error: false,
        imgur: {},
      }
    },
    methods :{
      async covidConfirmed(index) {
        this.widgets[index].chartOptions.xaxis.categories.splice(0)
        this.widgets[index].chartSeries[0].data.splice(0)
        await axios.get('https://pomber.github.io/covid19/timeseries.json')
        .then(response => {
          console.log('Refreshing covid for' + this.widgets[index].parameter)
          response.data[this.widgets[index].parameter].forEach(d => {
            const date = moment(d.date, "YYYY-MM-DD").format("DD/MM/YYYY")
            const {
              confirmed,
              deaths,
              recovered,
            } = d;
            if (this.widgets[index].name == "Covid.confirmed") {
              this.widgets[index].chartOptions.xaxis.categories.push(date)
              this.widgets[index].chartSeries[0].name = 'confirmedCases'
              this.widgets[index].chartSeries[0].data.push(confirmed)
            }
            if (this.widgets[index].name == "Covid.death") {
              this.widgets[index].chartOptions.xaxis.categories.push(date)
              this.widgets[index].chartSeries[0].name = 'deaths'
              this.widgets[index].chartSeries[0].data.push(deaths)
            }
            if (this.widgets[index].name == "Covid.recovered") {
              this.widgets[index].chartOptions.xaxis.categories.push(date)
              this.widgets[index].chartSeries[0].name = 'recovered'
              this.widgets[index].chartSeries[0].data.push(recovered)
            }
          })
          this.widgets[index].isDisplayed = true
          this.$store.commit('setWidgets', this.widgets)
          this.interval = setTimeout(() => this.covidConfirmed(index),
          this.widgets[index].refreshRate);
        })
        .catch(e => {
            this.error = true
            console.log(e)
            setTimeout(() => {
              this.error = false
            }, 3000);
        })
      },
      async weatherCurrent(index) {
        await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.widgets[index].parameter + '&appid=' + process.env.VUE_APP_OPENWEATHERMAP_APIKEY)
        .then(response => {
          console.log('Refreshing weather for ' + this.widgets[index].parameter)
          this.widgets[index].data = response.data
          this.widgets[index].isDisplayed = true
          this.$store.commit('setWidgets', this.widgets)
          this.interval = setTimeout(() => this.weatherCurrent(index),
          this.widgets[index].refreshRate);
        })
        .catch(e => {
          this.error = true
          console.log(e)
          setTimeout(() => {
            this.error = false
          }, 3000);
        })
      },
      async getTime(index) {
        await axios.get('https://timezone.abstractapi.com/v1/current_time?api_key=' + process.env.VUE_APP_ABSTRACT_APIKEY + '&location=' + this.widgets[index].parameter)
        .then(response => {
          console.log('Refreshing time for ' + this.widgets[index].parameter)
          this.widgets[index].data = response.data
          this.widgets[index].isDisplayed = true
          this.$store.commit('setWidgets', this.widgets)
          this.interval = setTimeout(() => this.getTime(index),
          this.widgets[index].refreshRate);
        })
        .catch(e => {
          this.error = true
          console.log(e)
          setTimeout(() => {
            this.error = false
          }, 3000);
        })
      },
      async querySteam(index) {
      await axios.get('https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + process.env.VUE_APP_STEAM_APIKEY + '&format=json&steamids=' + this.widgets[index].steamID64)
      .then(response => {
        console.log('Refreshing steam for' + this.widgets[index].parameter)
        this.widgets[index].data = response.data.response.players[0]
        this.widgets[index].isDisplayed = true
        this.$store.commit('setWidgets', this.widgets)
        this.interval = setTimeout(() => this.querySteam(index),
        this.widgets[index].refreshRate);
        console.log(this.widgets[index].data)
      })
      .catch(e => {
        this.error = true
        console.log(e)
        setTimeout(() => {
          this.error = false
        }, 3000);
      })
    },
    async getImgur(index) {
      await axios.get('https://api.imgur.com/3/account/' + this.imgur.account_username + '/gallery_favorites/' + this.widgets[index].parameter, {
        headers: {
          'Authorization': 'Bearer ' + this.imgur.access_token
        }
      })
      .then(response => {
        console.log('Refreshing imgur for ' + this.imgur.account_username + this.widgets[index].parameter)
        this.widgets[index].data = response.data.data
        this.widgets[index].isDisplayed = true
        this.$store.commit('setWidgets', this.widgets)
        this.interval = setTimeout(() => this.getImgur(index),
        this.widgets[index].refreshRate);
      })
      .catch(e => {
        this.error = true
        console.log(e)
        setTimeout(() => {
          this.error = false
        }, 3000);
      })
    },
    saveWidgetChanges(event) {
      this.$store.commit('setWidgets', this.widgets)
    },
    async getExchangeRate(index) {
      await axios.get('https://api.exchangeratesapi.io/latest?base=' + this.widgets[index].parameter)
      .then(response => {
        console.log('Refreshing exchange rates for ' + this.widgets[index].parameter)
        this.widgets[index].data = response.data
        this.widgets[index].isDisplayed = true
        this.$store.commit('setWidgets', this.widgets)
        this.interval = setTimeout(() => this.getExchangeRate(index),
        this.widgets[index].refreshRate);
      })
      .catch(e => {
        this.error = true
        console.log(e)
        setTimeout(() => {
          this.error = false
        }, 3000);
      })
    },
    async getVideoPlayer(index) {
      console.log('Getting video for URL : ' + this.widgets[index].parameter)
      this.widgets[index].isDisplayed = true
      this.$store.commit('setWidgets', this.widgets)
      this.interval = setTimeout(() => this.getVideoPlayer(index),
      this.widgets[index].refreshRate);
    }
    },
    async mounted() {
      this.imgur = this.$store.getters.getImgur
      this.widgets = this.$store.getters.getWidgets
      await axios.get('http://localhost:8080/me', {
          headers: {
              'Authorization': 'Bearer ' + this.$store.getters.getJWToken
          }
      })
      .then(response => {
          console.log(response.data)
          this.userData = response.data.data
      })
      .catch(e => {
        this.error = true
        console.log(e)
        setTimeout(() => {
          this.error = false
        }, 3000);
      })
    let index = 0
    this.widgets.forEach(d => {
      if (d.isDisplayed && (d.name == "Covid.confirmed" || d.name == "Covid.death" || d.name == "Covid.recovered")) {
        this.covidConfirmed(index)
      }
      if (d.isDisplayed && (d.name == "Weather.current")) {
        this.weatherCurrent(index)
      }
      if (d.isDisplayed && (d.name == "Time")) {
        this.getTime(index)
      }
      if (d.isDisplayed && (d.name == "Steam")) {
        this.querySteam(index)
      }
      if (d.isDisplayed && (d.name == "Imgur")) {
        this.getImgur(index)
      }
      if (d.isDisplayed && (d.name == "ExchangeRate")) {
        this.getExchangeRate(index)
      }
      if (d.isDisplayed && (d.name == "VideoPlayer")) {
        this.getVideoPlayer(index)
      }
      index++
    })
  },
}
</script>
