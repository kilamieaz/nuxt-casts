<template>
	<v-container>
		<h1>Video Create Page</h1>
		<v-row>
			<v-col md="3" cols="12">
				<VideoEditForm :video="video" :saveVideo="createVideo" buttonText="Create Video"></VideoEditForm>
			</v-col>
			<v-col md="9" cols="12">
				<ListVideo :video="video" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ListVideo from "@/components/ListVideo";
import VideoEditForm from "@/components/VideoEditForm";
export default {
	components: {
		ListVideo,
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
			this.$router.push(`/watch/${video.id}`);
		}
	}
};
</script>