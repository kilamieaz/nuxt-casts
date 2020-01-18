<template>
	<span>{{ publishedAt.getMonth() + 1}}/{{ publishedAt.getDate()}}/{{ publishedAt.getYear() }}</span>
</template>

<script>
export default {
	props: ["publishedAt"]
};
</script>

<style lang="scss" scoped>
</style>