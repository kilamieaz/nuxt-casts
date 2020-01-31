<template>
	<v-container>
		<h1>Video List</h1>
		<v-btn text to="/admin/videos/create">Add Video</v-btn>

		<VideoTable
			:videos="videos"
			:headers="headers"
			:customClickAction="goToVideoShow"
			dense="true"
			itemsPerPage="20"
		></VideoTable>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import VideoTable from "@/components/VideoTable";

export default {
	components: {
		VideoTable
	},
	computed: {
		...mapState({ videos: state => state.videos.videos }),
		headers() {
			return [
				{ text: "Name", value: "name" },
				{ text: "Date", value: "published_at" },
				{ text: "Duration", value: "duration" },
				{ text: "Tags", value: "tags", sortable: false },
				{ text: "Actions", value: "actions", sortable: false }
			];
		}
	},
	methods: {
		goToVideoShow(video) {
			this.$router.push(`/admin/videos/${video.id}`);
		}
	}
};
</script>

<style lang="scss" scoped>
</style>