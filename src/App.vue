<template>
  <div id="app">
  	<transition name="fade" mode="out-in">
  		<router-view/>
  	</transition>
   </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style >
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
}
.fade-enter-active,.fade-leave-active {
	transition: all .2s ease;
}
.fade-enter,.fade-leave-to {
	opacity: 0
}
</style>
