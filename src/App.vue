<template>
  <div id="app">
    <button v-if="isSignedIn" class="logoutBtn" @click="logout">Logout</button>
    <transition name="bounce">
      <toast />
    </transition>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      watchTime: "",
    };
  },
  computed: {
    ...mapGetters({
      authExpiry: "auth/authExpiry",
      isSignedIn: "auth/isSignedIn",
    }),
  },
  watch: {
    authExpiry: {
      immediate: true,
      handler(val) {
        if (val) {
          this.timeWatcher();
        } else if (!val) {
          clearInterval(this.watchTime);
        }
      }
    }
  },
  methods: {
    logout() {
      // clear interval on intended logout
      clearInterval(this.watchTime);
      this.$store.dispatch("auth/signOut");
    },
    timeWatcher() {
      const current = new Date().getTime();
      const expiry = new Date(this.authExpiry).getTime();

      // method to check for expiry time, runs every 1 second
      if (this.authExpiry) {
        this.watchTime = setInterval(() => {
          if (current >= expiry) {
            clearInterval(this.watchTime);
            this.$store.dispatch("auth/signOut");
          }
        }, 1000);
      }
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
