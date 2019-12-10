<template>
	<div>
		<div class="display-3 ma-4 d-flex justify-center">Video with tag "{{ tag.name }}"</div>
		<div class="d-flex flex-wrap">
			<div v-for="video in tag.videos" :key="video.id">
				<ListVideo :video="video"></ListVideo>
			</div>
		</div>
	</div>
</template>

<script>
import ListVideo from "@/components/ListVideo";
export default {
	components: {
		ListVideo
	},
	async asyncData({ $axios, params }) {
		let response = await $axios.get(`/tags/${params.id}`);
		let tag = response.data.data;
		return {
			tag
		};
	}
};
</script>

<style lang="scss" scoped>
</style>