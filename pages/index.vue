<template>
	<div class="home">
		<div class="display-4 ma-4 d-flex justify-center">Videos</div>
		<div class="d-flex flex-wrap">
			<div v-for="video in videos" :key="video.id">
				<ListVideo :video="video"></ListVideo>
			</div>
		</div>
	</div>
</template>

<script>
import ListVideo from "../components/ListVideo";
export default {
	components: {
		ListVideo
	},
	async asyncData({ $axios }) {
		let response = await $axios.get("/videos");
		let videos = response.data.data;
		return {
			videos
		};
	}
};
</script>

<style>
</style>
