<template>
	<v-container v-if="video">
		<VideoEditForm :video="video" :saveVideo="saveVideo" buttonText="Save Video"></VideoEditForm>
	</v-container>
</template>

<script>
import VideoEditForm from "@/components/VideoEditForm";
import { mapState, mapGetters } from "vuex";
export default {
	components: {
		VideoEditForm
	},
	computed: {
		...mapState({ videos: state => state.videos.videos }),
		...mapGetters({ getVideo: "videos/get" }),
		video() {
			return this.getVideo(this.$route.params.id);
		}
	},
	methods: {
		async saveVideo() {
			let video = await this.$store.dispatch("videos/edit", this.video);
			this.$store.dispatch("snackbars/setSnackbar", {
				text: `You have successfully edited your video, ${video.name}`
			});
			this.$router.push({ name: "admin-video-list" });
		}
	}
};
</script>