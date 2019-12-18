<template>
	<v-container>
		<h1>Video Create Page</h1>
		<VideoEditForm :video="video" :saveVideo="createVideo" buttonText="Create Video"></VideoEditForm>
	</v-container>
</template>

<script>
import VideoEditForm from "@/components/VideoEditForm";
export default {
	components: {
		VideoEditForm
	},
	data() {
		return {
			video: {}
		};
	},
	methods: {
		async createVideo() {
			let video = await this.$store.dispatch("videos/create", this.video);
			this.$router.push(`/admin/videos/${video.id}`);
		}
	}
};
</script>