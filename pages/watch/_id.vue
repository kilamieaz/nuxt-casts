<template>
	<v-container>
		<v-row>
			<v-col md="9" cols="12">
				<VideoWatch :video="video"></VideoWatch>
			</v-col>
			<v-col md="3" cols="12">
				<div class="display-1">{{ video.name }}</div>
				<VideoByLine :video="video"></VideoByLine>

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
import VideoWatch from "@/components/VideoWatch";
import { mapState } from "vuex";
import VideoByLine from "@/components/VideoByLine";

export default {
	components: {
		VideoByLine,
		VideoWatch
	},
	computed: {
		// ...mapGetters({ videoIsPlayed: "users/videoIsPlayed" }),
		// ...mapState({
		// 	videos: state => state.videos.videos,
		// 	currentUser: state => state.users.currentUser
		// }),

		...mapState({ videos: state => state.videos.videos }),

		video() {
			return this.videos.find(vid => vid.id == this.$route.params.id);
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