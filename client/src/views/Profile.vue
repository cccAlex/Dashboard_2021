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
                    <a href="#" class="text-gray-600">Profile</a>
                </li>
            </ol>
        </nav>
        <!-- breadcrumb end -->
        <div class="lg:flex justify-between items-center mb-6">
            <p class="text-2xl font-semibold mb-2 lg:mb-0">My profile</p>
        </div>

        <div v-if="error" class="md:grid content-center">
            <div class="bg-red-300 border-l-4 border-red-600 text-orange-dark p-4 mb-8" role="alert">
                <p class="font-bold">Error</p>
                <p>There was an error getting your information, please try to refresh or contact us <a href="mailto:alexandre.lin@epitech.eu" class="text-red-400">here</a>.
                This error happens when the server is offline.</p>
            </div>
            <img :src="require('../assets/error.png')" class="mx-auto"/>
        </div>
        <div v-if="!error" class="md:grid md:gap-6">
            <p v-if="!loggedInFromFacebook" class="text-sm font-semibold mb-2 lg:mb-0">Here are all the informations about that we know! :)</p>
            <p v-if="loggedInFromFacebook" class="text-sm font-semibold mb-2 lg:mb-0">You've logged in from facebook, you can't change any of your informations!</p>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" @submit.prevent="updateInfo">
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-6">
                                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                                    <input :disabled="loggedInFromFacebook" :value="userData.username" type="text" :v-model="username" id="text" class="mt-1 focus:ring-mikyored focus:border-mikyored block w-full sm:text-sm border-gray-300 rounded-md">
                                </div>
                            </div>

                            <div>
                                <div class="col-span-6">
                                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                                    <input :disabled="loggedInFromFacebook" :value="userData.email" :v-model="email" type="email" id="email" class="mt-1 focus:ring-mikyored focus:border-mikyored block w-full sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <p v-if="loggedInFromFacebook" class="mt-2 text-sm text-gray-500">
                                User logged in from facebook.
                                </p>
                            </div>

                            <div>
                                <div class="col-span-6">
                                    <label for="password" class="block text-sm font-medium text-gray-700">Change password</label>
                                    <input :disabled="loggedInFromFacebook" v-model="paswword" type="password" id="password" class="mt-1 focus:ring-mikyored focus:border-mikyored block w-full sm:text-sm border-gray-300 rounded-md">
                                </div>
                            </div>
                            <div>
                                <div class="col-span-6">
                                    <label for="password" class="block text-sm font-medium text-gray-700">Confirm password</label>
                                    <input :disabled="loggedInFromFacebook" v-model="ConfirmPaswword" type="password" id="confirmPassword" class="focus:ring-mikyored focus:border-mikyored block w-full sm:text-sm border-gray-300 rounded-md">
                                </div>
                            </div>

                            <div>
                                <div class="col-span-6">
                                    <label for="registerationDate" class="block text-sm font-medium text-gray-700">Registeration date</label>
                                    <input disabled :value="date" type="text" id="registerationDate" class="mt-1 focus:ring-mikyored focus:border-mikyored block w-full sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <p class="mt-2 text-sm text-gray-500">
                                  You've logged in {{ userData.__v }} times!
                                </p>
                                <p class="mt-2 text-sm text-gray-500">
                                  Click <a href="" class="mt-2 text-sm text-mikyored">here</a> if you want to logout from all your devices.
                                </p>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-150 text-right sm:px-6">
                            <button :disabled="loggedInFromFacebook" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mikyored hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mikyored">
                            Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Profile',
    data() {
        return {
            userData: [],
            username: "",
            email: "",
            password: "",
            date: "",
            loggedInFromFacebook: false,
            error: true,
        }
    },
    async mounted() {
        await axios.get('http://localhost:8080/me', {
            headers: {
                'Authorization': 'Bearer ' + this.$store.getters.getJWToken
            }
        })
        .then(response => {
            this.error = false
            console.log(response.data)
            this.userData = response.data.data
            this.date = moment(this.userData).format('dddd, MMMM Do YYYY [at] h:mm a')
            var facebook = String(this.userData.email)
            if (facebook.includes(".fb")) {
                this.loggedInFromFacebook = true
            }
        })
        .catch(e => {
            this.error = true
            console.log(e)
        })
    },
    methods: {
        async updateInfo() {
            if (email || username || password) {
                await axios.patch('http://localhost:8080/me', {
                    email: this.email,
                    username: this.username,
                    password: this.password
                }, {
                    headers: {
                    'Authorization': 'Bearer ' + this.$store.getters.getJWToken
                    }
                })
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 3000);
                    console.log(e)
                })
            }
        },
    }
}
</script>
