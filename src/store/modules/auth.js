import router from "@/router";
const state = {
    authSecretKey: localStorage.getItem("secretKey"),
    authExpiry: localStorage.getItem("authExpiry") || 0,
}
const getters = {
    isSignedIn: (state) => state.authSecretKey === "authenticated",
    authExpiry: (state) => state.authExpiry
}
const actions = {
    signOut({ commit }) {
        localStorage.removeItem("secretKey");
        localStorage.removeItem("authExpiry");
        commit("setAuthSecretKey", null)

        return window.location.href = "/"
    },
    signIn({ commit }) {        
        const oneDay = 1000 * 60 * 60 * 24;
        const date = new Date()

        localStorage.setItem("authExpiry", new Date(date.getTime() + (oneDay * 2)))
        localStorage.setItem("secretKey", "authenticated")

        commit("setAuthSecretKey", localStorage.getItem("secretKey"))
        commit("setAuthExpiry", localStorage.getItem("authExpiry"))

        return router.push("/dashboard")
    }
}
const mutations = {
    setAuthSecretKey(state, val) {
        state.authSecretKey = val
    },
    setAuthExpiry(state, val) {
        console.log(val);
        state.authExpiry = val
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}