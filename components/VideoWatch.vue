<template>
	<div class="video-player-box" ref="videoPlayer" v-video-player:myVideoPlayer="playerOptions"></div>
	<!-- @ended="markVideoPlayed" -->
</template>

<script>
import "video.js/dist/video-js.css";
import Vue from "vue";

if (process.browser) {
	const VueVideoPlayer = require("vue-video-player/dist/ssr");
	Vue.use(VueVideoPlayer);
}
export default {
	computed: {
		playerOptions() {
			return {
				// videojs options
				language: "en",
				playbackRates: [0.7, 1.0, 1.5, 2.0, 2, 5, 3.0],
				sources: [
					{
						type: "video/mp4",
						src: this.video.video_url
					}
				],
				poster: this.video.thumbnail,
				fluid: true
			};
		}
	},
	props: {
		video: {
			type: Object,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
</style>