<template>
  <div class="login allChildrenCenter fillHeight">
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from './components/LoginCard'

export default {
  name: 'Login',
  components: { LoginCard },
}
</script>
<style lang="scss" scoped src="@/assets/styles/login.scss"></style>
