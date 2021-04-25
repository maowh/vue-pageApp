<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <div class="header-right">
      城市
      <span class="iconfont arrow-icon">&#xe64a;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data() {
    return {}
  },
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles';
.header
  display: flex
  line-height: 0.86rem
  background: $bgColor
  color: #fff
  .header-left
    width: 0.64rem
    float: left
    .back-icon
      text-align: center
      font-size: 0.4rem
  .header-input
    flex: 1
    background: #fff
    border-radius: 0.1rem
    height: 0.64rem
    line-height: 0.64rem
    margin-top: 0.12rem
    margin-left: 0.2rem
    color: #ccc
    padding-left: 0.2rem
  .header-right
    width: 1.24rem
    float: right
    text-align: center
    .arrow-icon {
      margin-left: -0.04rem
      font-size: 0.24rem
}
</style>
