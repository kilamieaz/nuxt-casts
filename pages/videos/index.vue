<template>
	<div>
		<nuxt-child />
		<h1>Videos</h1>
		<div v-for="video in $store.state.videos" :key="video.id">
			<nuxt-link :to="`/videos/${video.id}`">{{ video.name }}</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	head: {
		title: "Screencasts - Video List"
	},
	// in asyncData its not going to display the template, until the promise you return from it result
	// fetch like AD but instead return data, its let you do stuff
	async fetch({ $axios, store }) {
		let response = await $axios.get("/videos");
		let videos = response.data.data;
		store.commit("SET_VIDEOS", videos);
	}
};
</script>

<style lang="scss" scoped>
</style>