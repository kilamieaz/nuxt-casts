<template>
	<v-container>
		<v-row>
			<v-col md="9" cols="12">
				<div class="video-player-box" ref="videoPlayer" v-video-player:myVideoPlayer="playerOptions"></div>
				<!-- @ended="markVideoPlayed" -->
			</v-col>
			<v-col md="3" cols="12">
				<div class="display-1">{{ video.name }}</div>
				<!-- <div class="green--text" v-if="videoIsPlayed(video.id)">
					<v-row>
						<v-col cols="1">
							<v-icon class="green--text" small>fas fa-check</v-icon>
						</v-col>
						<v-col cols="11">Played</v-col>
					</v-row>
				</div>
				<div v-else>
					<v-btn x-small @click="markVideoPlayed" v-if="currentUser.name">Mark Played</v-btn>
				</div>-->
				<div v-html="video.description"></div>
				<span v-for="tag in video.tags" :key="tag.id">
					<v-btn color="green lighten-2" class="ma-1" :to="`/tags/${tag.id}`">{{ tag.name }}</v-btn>
				</span>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import "video.js/dist/video-js.css";
import Vue from "vue";

if (process.browser) {
	const VueVideoPlayer = require("vue-video-player/dist/ssr");
	Vue.use(VueVideoPlayer);
}
import { mapState } from "vuex";
export default {
	computed: {
		// ...mapGetters({ videoIsPlayed: "users/videoIsPlayed" }),
		// ...mapState({
		// 	videos: state => state.videos.videos,
		// 	currentUser: state => state.users.currentUser
		// }),

		...mapState({ videos: state => state.videos.videos }),

		video() {
			return this.videos.find(vid => vid.id == this.$route.params.id);
		},

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
	methods: {
		// markVideoPlayed() {
		//     this.$store.dispatch("users/markVideoPlayed", this.video.id);
		// }
	}
};
</script>


<style>
</style>