<template>
	<div>
		<h1>edit</h1>
		<nuxt-link :to="`/videos/${video.id}`">
			<button>Show</button>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	props: ["video"],
	head: {
		title: "Edit"
	}
};
</script>

<style lang="scss" scoped>
</style>