<template>
	<span v-if="date">{{ date.getMonth() + 1}}/{{ date.getDate()}}/{{ date.getYear() }}</span>
</template>

<script>
export default {
	props: { date: Date }
};
</script>

<style lang="scss" scoped>
</style>