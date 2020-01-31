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
		}),
		headers() {
			return [
				{ text: "Name", value: "name" },
				{ text: "Date", value: "published_at" },
				{ text: "Duration", value: "duration" },
				{ text: "Played", value: "played", sortable: false },
				{ text: "Tags", value: "tags", sortable: false }
			];
		}
	},
	methods: {
		goToVideo(item) {
			this.$router.push(`/watch/${item.id}`);
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
		}
	},
	props: ["videos"]
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