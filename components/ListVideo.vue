<template>
	<div>
		<v-card width="340px" hover class="ma-2">
			<nuxt-link :to="`/watch/${video.id}`">
				<v-img :src="video.thumbnail || ''" alt />
				<v-card-title>{{ video.name }}</v-card-title>
				<v-card-text>
					<VideoByLine :video="video"></VideoByLine>

					<div class="green--text" v-if="videoIsPlayed(video.id)">
						<v-row>
							<v-col cols="1">
								<font-awesome-icon icon="check" />
							</v-col>
							<v-col cols="11">Played</v-col>
						</v-row>
					</div>
				</v-card-text>
			</nuxt-link>

			<v-card-actions v-if="tags">
				<span v-for="tag in tags" :key="tag.id">
					<v-btn
						color="green lighten-2"
						class="mr-2"
						small
						@mousedown.stop
						:to="`/tags/${tag.id}`"
					>{{ tag.name }}</v-btn>
				</span>
			</v-card-actions>
		</v-card>
	</div>
</template>


<script>
import { mapGetters } from "vuex";
import VideoByLine from "@/components/VideoByLine";

export default {
	components: {
		VideoByLine
	},
	computed: {
		...mapGetters({ videoIsPlayed: "user/videoIsPlayed" })
	},
	props: {
		video: {
			type: Object,
			required: true
		},
		tags: {
			type: Object,
			required: true
		}
	}
};
</script>

<style scoped lang="scss">
a {
	text-decoration: none;
	color: black;
}
</style>