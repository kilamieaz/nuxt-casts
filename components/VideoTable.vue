<template>
	<div>
		<v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
		<v-data-table
			:items="videos"
			:headers="headers"
			sort-by="published_at"
			:sort-desc="true"
			@click:row="goToVideo"
			:search="search"
			:custom-filter="filter"
			show-expand
			:dense="dense"
			:items-per-page="itemsPerPage || 10"
		>
			<template #item.published_at="{item}">
				<DateDisplay :date="item.published_at" />
			</template>
			<template #item.duration="{value}">
				<DurationDisplay :duration="value" />
			</template>
			<template #item.played="{item}">
				<div class="green--text" v-if="videoIsPlayed(item.id)">
					<v-row>
						<font-awesome-icon icon="check" />
					</v-row>
				</div>
				<div class="red--text" v-else>
					<v-row>
						<font-awesome-icon icon="times" />
					</v-row>
				</div>
			</template>
			<template #item.tags="{item}">
				<td @click.stop class="non-clickable">
					<span v-for="tag in item.tags" :key="tag.id">
						<v-btn color="green lighten-2" class="mr-1" x-small :to="`/tags/${tag.id}`">{{ tag.name }}</v-btn>
					</span>
				</td>
			</template>
			<template #item.actions="{item}">
				<td @click.stop class="non-clickable">
					<v-btn x-small :to="`/watch/${item.id}`">Watch</v-btn>
					<v-btn x-small :to="`/admin/videos/${item.id}`">Show</v-btn>
					<v-btn x-small :to="`/admin/videos/${item.id}/edit`">Edit</v-btn>
					<v-btn x-small @click="deleteVideo(item)">Delete</v-btn>
				</td>
			</template>
			<template #expanded-item="{headers, item}">
				<td :colspan="headers.length">
					<v-row>
						<v-col cols="12" md="4">
							<VideoWatch :video="item"></VideoWatch>
						</v-col>
						<v-col cols="12" md="8">
							<h1>{{ item.name }}</h1>
							<MarkdownDisplay :markdown="item.description"></MarkdownDisplay>
						</v-col>
					</v-row>
				</td>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import DurationDisplay from "@/components/DurationDisplay";
import DateDisplay from "@/components/DateDisplay";
import VideoWatch from "@/components/VideoWatch";
import MarkdownDisplay from "@/components/MarkdownDisplay";
export default {
	components: {
		DurationDisplay,
		DateDisplay,
		VideoWatch,
		MarkdownDisplay
	},
	data() {
		return { search: "" };
	},
	computed: {
		...mapGetters({
			videoIsPlayed: "user/videoIsPlayed"
		})
	},
	methods: {
		goToVideo(item) {
			if (this.customClickAction) {
				this.customClickAction(item);
			} else {
				this.$router.push(`/watch/${item.id}`);
			}
		},
		filter(value, search, item) {
			let inName = RegExp(search, "i").test(item.name);
			let inTags = false;
			item.tags.map(tag => {
				let inTag = RegExp(search, "i").test(tag.name);
				if (inTag) {
					inTags = true;
				}
			});
			return inName || inTags;
		},
		deleteVideo(video) {
			let response = confirm(
				`Are you sure you want to delete ${video.name}`
			);
			if (response) {
				this.$store.dispatch("videos/delete", video);
				this.$store.dispatch("snackbars/setSnackbar", {
					text: `You have successfully deleted your video, ${video.name}`
				});
			}
		}
	},
	props: {
		videos: {
			type: Array,
			required: true
		},
		headers: {
			type: Array,
			required: true
		},
		customClickAction: {
			type: Function,
			required: false
		},
		dense: {
			type: Boolean
		},
		itemsPerPage: Number
	}
};
</script>

<style lang="scss" scoped>
::v-deep tbody tr {
	cursor: pointer;
}

::v-deep tbody tr td.non-clickable {
	cursor: auto;
}
</style>