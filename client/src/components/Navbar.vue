<template>
    <div class="sticky top-0 z-40">
            <div class="w-full h-20 px-6 bg-gray-100 border-b flex items-center justify-between">

              <!-- left navbar -->
              <div class="flex">

                <!-- mobile hamburger -->
                <div class="inline-block lg:hidden flex items-center mr-4">
                  <button class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger" @click="toggleSidebar()">
                    <svg class="h-5 w-5" v-bind:style="{ fill: 'black' }" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                  </button>
                </div>
              </div>


            <!-- drop down-->
            <div class="relative inline-block text-left">
                <div>
                    <img src="https://www.flaticon.com/svg/static/icons/svg/17/17004.svg" class="w-12 h-12 rounded-full shadow-lg" @click="dropDownOpen = !dropDownOpen">
                </div>

                <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" :class="dropDownOpen ? '' : 'hidden'">
                    <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900" role="menuitem">Account settings</a>
                        <form action="#" @click.prevent="logout">
                            <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                              Sign out
                            </button>
                        </form>
                    </div>
                </div>
                </div>
            </div>

            <!-- dropdown menu end -->

    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'Navbar',
    computed: {
        ...mapState(['sideBarOpen'])
    },
    data() {
        return {
            dropDownOpen: false
        }
    },
    methods: {
        toggleSidebar() {
            this.$store.dispatch('toggleSidebar')
        },
        async logout() {
            console.log(this.$store.getters.getJWToken)
            await axios.get('http://localhost:8080/logout', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ` + this.$store.getters.getJWToken
                }
            })
            .then(response => {
                console.log(response)
                this.$store.commit('removeJWToken')
                this.$store.commit('emptyWidgets')
                this.$store.commit('emptyImgur')
                this.$router.replace({ name: 'Login' })
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
}
</script>