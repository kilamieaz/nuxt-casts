<template>
	<em>
		<DurationDisplay :duration="video.duration" />
		&nbsp; | &nbsp;
		Published on {{ video.created_at }}
	</em>
</template>

<script>
import DurationDisplay from "@/components/DurationDisplay";

export default {
	components: {
		DurationDisplay
	},
	props: ["video"]
};
</script>

<style lang="scss" scoped>
</style>