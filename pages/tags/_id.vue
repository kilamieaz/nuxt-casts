<template>
	<div class="home">
		<div class="display-4 ma-4 d-flex justify-center">Videos with tag "{{ tag.name }}"</div>

		<VideoTable :videos="videosOnTag"></VideoTable>
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
		...mapState({ tags: state => state.tags.tags })
	}
};
</script>

<style>
</style>
