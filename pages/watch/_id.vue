<template>
	<v-container>
		<v-row>
			<v-col md="9" cols="12">
				<VideoWatch :video="video"></VideoWatch>
			</v-col>
			<v-col md="3" cols="12">
				<div class="display-1">{{ video.name }}</div>
				<VideoByLine :video="video"></VideoByLine>

				<div class="green--text" v-if="videoIsPlayed(video.id)">
					<v-row>
						<v-col cols="1">
							<font-awesome-icon icon="check" />
						</v-col>
						<v-col cols="11">Played</v-col>
					</v-row>
				</div>
				<div v-else>
					<v-btn x-small @click="markPlayed" v-if="this.$auth.loggedIn">Mark Played</v-btn>
				</div>

				<MarkdownDisplay :markdown="video.description"></MarkdownDisplay>
				<span v-for="tag in video.tags" :key="tag.id">
					<v-btn color="green lighten-2" class="ma-1" :to="`/tags/${tag.id}`">{{ tag.name }}</v-btn>
				</span>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<h1>Code Summary</h1>
				<MarkdownDisplay :markdown="video.code_summary"></MarkdownDisplay>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import VideoWatch from "@/components/VideoWatch";
import VideoByLine from "@/components/VideoByLine";
import MarkdownDisplay from "@/components/MarkdownDisplay";

export default {
	components: {
		VideoByLine,
		VideoWatch,
		MarkdownDisplay
	},
	computed: {
		...mapState({ videos: state => state.videos.videos }),
		...mapGetters({ videoIsPlayed: "user/videoIsPlayed" }),

		video() {
			return this.videos.find(vid => vid.id == this.$route.params.id);
		}
	},
	methods: {
		markVideoPlayed() {
			this.$store.dispatch("user/markVideoPlayed", this.video.id);
		}
	}
};
</script>


<style>
</style>