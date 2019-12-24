<template>
	<div>
		<div class="display-1 pt-3">{{ video.name }}</div>
		<VideoByLine :video="video"></VideoByLine>
		<v-row>
			<v-col cols="12" sm="6" md="8">
				<MarkdownDisplay :markdown="video.description" />
				<h3 v-if="video.code_summary">Code Summary</h3>
				<MarkdownDisplay :markdown="video.code_summary" />
			</v-col>
			<v-col cols="12" sm="6" md="4">
				<VideoWatch :video="video"></VideoWatch>
			</v-col>
		</v-row>

		<v-combobox
			:items="tags"
			item-text="name"
			v-model="videoTags"
			multiple
			chips
			deletable-chips
			return-object
		></v-combobox>
		<v-btn :to="`/admin/videos/${video.id}/edit`">Edit</v-btn>
		<v-btn :to="`/watch/${video.id}`">Watch</v-btn>
	</div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import VideoByLine from "@/components/VideoByLine";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import VideoWatch from "@/components/VideoWatch";

export default {
	components: {
		VideoByLine,
		MarkdownDisplay,
		VideoWatch
	},
	computed: {
		...mapState({
			videos: state => state.videos.videos,
			tags: state => state.tags.tags
		}),
		video() {
			return this.videos.find(v => v.id == this.$route.params.id);
		},
		videoTags: {
			get() {
				return this.video.tags;
			},
			async set(newTags) {
				// allows the user to enter tag that do not exist and create the new tag
				let createTag = newTags.find(t => typeof t === "string");

				if (createTag) {
					let createdTag = await this.$store.dispatch("tags/create", {
						name: createTag
					});
					this.$store.dispatch("tags/connectToVideo", {
						tag: createdTag,
						video: this.video
					});
				} else {
					let addedTags = _.differenceBy(
						newTags,
						this.videoTags,
						"id"
					);
					let removeTags = _.differenceBy(
						this.videoTags,
						newTags,
						"id"
					);
					if (addedTags.length > 0) {
						this.$store.dispatch("tags/connectToVideo", {
							tag: addedTags[0],
							video: this.video
						});
					}
					if (removeTags.length > 0) {
						this.$store.dispatch("tags/disconnectFromVideo", {
							tag: removeTags[0],
							video: this.video
						});
					}
				}
			}
		}
	}
};
</script>