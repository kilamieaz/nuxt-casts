<template>
	<div class="home">
		<div class="display-4 ma-4 d-flex justify-center">Videos with tag "{{ tag.name }}"</div>

		<VideoTable :videos="videosOnTag" :headers="headers"></VideoTable>
	</div>
</template>

<script>
import { mapState } from "vuex";
import VideoTable from "@/components/VideoTable";

export default {
	components: {
		VideoTable
	},
	computed: {
		tag() {
			return this.tags.find(t => t.id == this.$route.params.id);
		},
		videosOnTag() {
			return this.tag.videos;
		},
		...mapState({ tags: state => state.tags.tags }),
		headers() {
			return [
				{
					text: "Played",
					value: "played",
					sortable: false,
					width: "20px"
				},
				{ text: "Name", value: "name" },
				{ text: "Date", value: "published_at" },
				{ text: "Duration", value: "duration" },
				{ text: "Tags", value: "tags", sortable: false }
			];
		}
	}
};
</script>

<style>
</style>
