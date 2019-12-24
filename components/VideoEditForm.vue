<template>
	<v-form v-model="valid">
		<v-text-field
			v-model="video.name"
			label="Name"
			counter="50"
			:rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"
		/>
		<v-text-field v-model="video.duration" label="Duration (in seconds)">
			<template #prepend>
				<span class="duration-display">
					<DurationDisplay :duration="video.duration" />
				</span>
			</template>
		</v-text-field>

		<v-row>
			<v-col cols="12" sm="9" md="10">
				<v-text-field
					v-model="video.video_url"
					label="Video URL"
					hint="Use Amazon s3 or similiar instead of Youtube and vimeo"
					:rules="[required('video URL')]"
				/>

				<v-text-field
					v-model="video.thumbnail"
					label="Thumbnail URL"
					:rules="[required('thumbnail URL')]"
				/>
			</v-col>
			<v-col cols="12" sm="3" md="2">
				<VideoWatch :video="video"></VideoWatch>
			</v-col>
		</v-row>

		<v-datetime-picker label="Select Datetime" v-model="video.published_at"></v-datetime-picker>

		<MarkdownEditor :markdown="video.description">
			<v-textarea
				v-model="video.description"
				label="Description"
				counter="true"
				rows="9"
				:rules="[required('description'), minLength('description', 20)]"
			/>
		</MarkdownEditor>

		<MarkdownEditor :markdown="video.code_summary">
			<v-textarea v-model="video.code_summary" label="Code Summary" rows="12" />
			<template #footer>This code will be displayed below the video.</template>
		</MarkdownEditor>

		<v-btn @click="saveVideo" :disabled="!valid">{{buttonText}}</v-btn>
	</v-form>
</template>

<script>
import validations from "@/utils/validations";
import MarkdownEditor from "@/components/MarkdownEditor";
import DurationDisplay from "@/components/DurationDisplay";
import VideoWatch from "@/components/VideoWatch";
export default {
	data() {
		return {
			valid: false,
			...validations
		};
	},
	components: {
		DurationDisplay,
		MarkdownEditor,
		VideoWatch
	},
	props: ["video", "saveVideo", "buttonText"]
};
</script>

<style lang="scss" scoped>
.duration-display {
	background-color: grey;
	color: white;
	border-radius: 5px;
	padding: 7px;
}
</style>