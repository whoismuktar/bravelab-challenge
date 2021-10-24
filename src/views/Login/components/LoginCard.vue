<template>
  <div class="login-card">
      <div class="login-card-container">
        <div class="form">
        <form class="login-form" @submit.prevent="handleLogin">
            <input v-model="username" autofocus type="text" placeholder="username"/>
            <input v-model="password" type="password" placeholder="password"/>
            <button type="submit">login</button>
        </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: "LordVader",
            password: "I_love_cats",
            errMsg: ""
        }
    },
    methods: {
        handleLogin() {
            const username = this.username
            const password = this.password

            if (!username || username !== this.credentials.username) {
                this.errMsg = "username is not correct";

                // inform store and toast a error to user
                return this.$store.dispatch("util/showToast", {content: this.errMsg, color: "red"})
            }
            if (!password || password !== this.credentials.password) {
                this.errMsg = "password is not correct";

                // inform store and toast a error to user
                return this.$store.dispatch("util/showToast", {content: this.errMsg, color: "red"})
            } else {

                // inform store and toast a success to user
                this.$store.dispatch("util/showToast", {content: "Cheers! You signed in successfully!", color: "#42ba96"})
                return this.$store.dispatch("auth/signIn")
            }

        },
    },
    computed: {
        credentials() {
            const data = {}
            data.username = "LordVader"
            data.password = "I_love_cats"

            return data
        },
    }
}
</script>

<style lang="scss" scoped src="@/assets/styles/loginCard.scss"></style>
