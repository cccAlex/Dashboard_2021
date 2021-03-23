<template>
    <div class="grid min-h-screen place-items-center bg-mikyogray">
        <div class="w-11/12 p-12 bg-gray-300 sm:w-8/12 md:w-1/2 lg:w-1/4 shadow-xl">
            <h1 class="text-xl font-semibold">Hello there 👋, <span class="font-normal">please fill in your information to register</span></h1>
            <form class="mt-6" action="#" @submit.prevent="register">
                <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Username</label>
                <input v-model="username" id="username" type="text" name="username" placeholder="Username" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                <input v-model="email" id="email" type="email" name="email" placeholder="email@email.com" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                <input v-model="password" id="password" type="password" name="password" placeholder="*********" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black focus:outline-none hover:bg-gray-900 hover:shadow-none">
                    Register
                </button>
            </form>
            <a href="/" class="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Already registered?</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    data () {
        return {
            username: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async register() {
            await axios.post('http://localhost:8080/register', {
                username: this.username,
                email: this.email,
                password: this.password
            })
            .then(response => {
                console.log(response.data.message)
                this.$router.replace({name: 'Login'})
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
}
</script>