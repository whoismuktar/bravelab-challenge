const state = {
    toast: {
        content: "message",
        color: "red"
    }
}
const actions = {
    showToast({commit}, data) {
        commit("setToast", data)
        document.querySelector(".toast").classList.add("showToast")

        setTimeout(() => {
            document.querySelector(".toast").classList.remove("showToast")
            commit("setToast", "")
        }, 5000);
    }
}
const mutations = {
    setToast(state, data) {
        state.toast = data
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}