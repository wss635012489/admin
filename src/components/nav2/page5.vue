<template>
	<div class="box">
		page5
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<style scoped>
	.box {
		font: 40px;
	}
</style>