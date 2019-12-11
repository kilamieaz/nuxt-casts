<template>
	<div>
		<div class="display-3 ma-4 d-flex justify-center">Video with tag "{{ tag.name }}"</div>
		<div class="d-flex flex-wrap">
			<div v-for="video in videosOnTag" :key="video.id">
				<ListVideo :video="video" :tags="video.tags"></ListVideo>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ListVideo from "@/components/ListVideo";
export default {
	components: {
		ListVideo
	},
	computed: {
		...mapState({
			videos: state => state.videos.videos,
			tags: state => state.tags.tags
		}),

		videosOnTag() {
			return this.videos.filter(v => {
				return this.tag.video_ids.includes(v.id);
			});
		},
		tag() {
			return this.tags.find(t => t.id == this.$route.params.id);
		}
	}
};
</script>

<style lang="scss" scoped>
</style>