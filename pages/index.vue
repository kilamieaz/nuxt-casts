<template>
	<div class="home">
		<div class="display-4 ma-4 d-flex justify-center">Videos</div>
		<div class="d-flex flex-wrap">
			<div v-for="video in videos" :key="video.id">
				<ListVideo :video="video" :tags="video.tags"></ListVideo>
			</div>
			<!-- <client-only v-for="video in videos" :key="video.id">
				<ListVideo :video="video"></ListVideo>
			</client-only>-->
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ListVideo from "../components/ListVideo";
export default {
	components: {
		ListVideo
	},
	computed: {
		...mapState(["videos"])
	}
};
</script>

<style>
</style>
