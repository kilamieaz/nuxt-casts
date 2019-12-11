<template>
	<v-container>
		<h1>Video List</h1>
		<v-btn text to="/admin/videos/create">Add Video</v-btn>

		<div class="flex-table">
			<div>Name</div>
			<div>Description</div>
			<div>Actions</div>
		</div>
		<div class="flex-table" v-for="video in videos" :key="video.id">
			<div>{{video.name}}</div>
			<div>{{video.description | abbreviate}}</div>
			<div class="actions">
				<nuxt-link :to="`/watch/${video.id}`">Watch</nuxt-link>
				<nuxt-link :to="`/admin/videos/${video.id}`">Show</nuxt-link>
				<nuxt-link :to="`/admin/videos/${video.id}/edit`">Edit</nuxt-link>

				<v-btn x-small @click="deleteVideo(video)">Delete</v-btn>
			</div>
		</div>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState({ videos: state => state.videos.videos })
	},
	filters: {
		abbreviate(text) {
			if (text) {
				text = text.replace("<p>", "");
				return text.slice(0, 50);
			}
		}
	},
	methods: {
		deleteVideo(video) {
			let response = confirm(
				`Are you sure you want to delete ${video.name}`
			);
			if (response) {
				this.$store.dispatch("videos/delete", video);
				// this.$store.dispatch("snackbars/setSnackbar", {
				// 	text: `You have successfully deleted your video, ${video.name}`
				// });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.flex-table {
	display: grid;
	grid-template-columns: repeat(auto-fill, 33%);
	padding: 10px;
	border-bottom: 1px black solid;

	&:nth-of-type(2n) {
		background-color: #dedede;
	}

	.actions {
		* {
			padding-right: 15px;
		}
	}
}
</style>