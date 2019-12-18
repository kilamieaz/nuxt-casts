<template>
	<v-form v-model="valid">
		<v-text-field
			v-model="video.name"
			label="Name"
			counter="50"
			:rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"
		/>
		<v-textarea
			v-model="video.description"
			label="Description"
			counter="true"
			:rules="[required('description'), minLength('description', 20)]"
		/>
		<v-textarea v-model="video.code_summary" label="Code Summary" />
		<v-text-field v-model="video.duration" label="Duration (in seconds)"></v-text-field>
		<DurationDisplay :duration="video.duration" />
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
		<v-btn @click="saveVideo" :disabled="!valid">{{buttonText}}</v-btn>
	</v-form>
</template>

<script>
import validations from "@/utils/validations";
import DurationDisplay from "@/components/DurationDisplay";
export default {
	data() {
		return {
			valid: false,
			...validations
		};
	},
	components: {
		DurationDisplay
	},
	props: ["video", "saveVideo", "buttonText"]
};
</script>