<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <HomeHeader></HomeHeader>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    HomeHeader
  }
}
</script>
