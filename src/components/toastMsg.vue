<template>
<div 
class="toast" 
ref="toast" 
:style="{backgroundColor: toast.color}"
>
    <span @click="closeToast" class="closer">x</span>
    {{ toast.content }}
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    methods: {
        closeToast() {
            document.querySelector(".toast").classList.remove("showToast")
        },
    },
    computed: {
        ...mapState({
            toast: state => state.util.toast // fetch toast update from store
        })
    },
}
</script>

<style lang="scss" scoped>
.toast {
    visibility: hidden;
    color: #ffffff;
    position: fixed;
    z-index: 99999;
    top: 50px;
    right: -100%;
    padding: 15px;
    max-width: 15%;
    overflow-wrap: break-word;
    transition: all .2s ease-out;
}
.showToast {
    visibility: visible;
    right: 0;
}

.closer {
    top: -6px;
    left: -8px;
}
</style>