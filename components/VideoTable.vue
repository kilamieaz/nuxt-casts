<template>
	<v-data-table
		:items="mungedVideos"
		:headers="headers"
		sort-by="sortable_published_at"
		:sort-desc="true"
	>
		<template #item.sortable_published_at="{item}">
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
					<font-awesome-icon icon="check" />
				</v-row>
			</div>
		</template>
		<template #item.tags="{item}">
			<span v-for="tag in item.tags" :key="tag.id">
				<v-btn color="green lighten-2" class="mr-1" x-small :to="`/tags/${tag.id}`">{{ tag.name }}</v-btn>
			</span>
		</template>
	</v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import DurationDisplay from "@/components/DurationDisplay";
import DateDisplay from "@/components/DateDisplay";
export default {
	components: {
		DurationDisplay,
		DateDisplay
	},
	computed: {
		...mapGetters({
			videoIsPlayed: "user/videoIsPlayed"
		}),
		headers() {
			return [
				{ text: "Name", value: "name" },
				{ text: "Date", value: "sortable_published_at" },
				{ text: "Duration", value: "duration" },
				{ text: "Played", value: "played", sortable: false },
				{ text: "Tags", value: "tags", sortable: false }
			];
		},
		mungedVideos() {
			return this.videos.map(v => {
				return {
					...v,
					sortable_published_at:
						v.published_at && v.published_at.toISOString()
				};
			});
		}
	},
	props: ["videos"]
};
</script>

<style lang="scss" scoped>
</style>