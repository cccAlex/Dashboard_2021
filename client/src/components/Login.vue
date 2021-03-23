<template>
        <div class="grid min-h-screen place-items-center bg-mikyogray">
        <div class="w-11/12 p-12 bg-gray-300 sm:w-8/12 md:w-1/2 lg:w-1/4 shadow-xl">
            <transition name="fade">
            <div v-if="error" class="bg-red-300 border-l-4 border-red-600 text-orange-dark p-4 mb-8" role="alert">
                <p class="font-bold">Error</p>
                <p>Incorrect credentials, please try again!</p>
            </div>
            </transition>
          <h1 class="text-xl font-semibold">Hello there 👋, <span class="font-normal">please fill in your information to continue</span></h1>
          <form class="mt-6" action="#" @submit.prevent="login">
              <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
              <input v-model="email" id="email" type="email" name="email" placeholder="email@email.com" autocomplete="email" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
              <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
              <input v-model="password" id="password" type="password" name="password" placeholder="**********" autocomplete="password" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
              <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-mikyored focus:outline-none hover:bg-red-900 hover:shadow-none">
                Login
              </button>
          </form>
          <div class="relative mt-6 h-px bg-gray-400">
              <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span class="bg-gray-300 px-4 text-xs text-gray-500 uppercase">Or Login With Facebook</span>
              </div>
          </div>
          <button @click.prevent="loginWithFacebook" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-800 shadow-lg focus:outline-none hover:bg-blue-900 hover:shadow-none">
              Login with facebook
          </button>
          <a href="/register" class="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Not registered?</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { initFbsdk } from '../config/facebook'

export default {
    name: 'Login',
    mounted() {
        initFbsdk()
    },
    data () {
        return {
            email: "",
            password: "",
            fbAcessToken: "",
            error: false
        }
    },
    methods: {
        async login() {
            await axios.post('http://localhost:8080/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                console.log(response)
                this.$store.commit('setJWToken', response.data.token)
                this.$router.replace({name: 'DashboardHome'})
            })
            .catch(e => {
                this.error = true
                setTimeout(() => {
                    this.error = false
                }, 3000);
                console.log(e)
            })
        },
        async getFacebookLoginData(token) {
            if (token) {
                await axios.post('http://localhost:8080/loginfb', {
                    userAccessToken: token
                })
                .then(response => {
                    console.log(response)
                    this.$store.commit('setJWToken', response.data.token)
                    this.$router.replace({name: 'DashboardHome'})
                })
                .catch(e => {
                    this.error = true
                    console.log(e)
                })
            } else {
                console.warn('Error with facebook authentification!')
                this.error = true
            }
        },
        loginWithFacebook () {
            window.FB.login(response => {
                this.getFacebookLoginData(response.authResponse.accessToken)
            }, { scope: 'email' })
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>