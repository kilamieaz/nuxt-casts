<template>
	<span>{{ minutes }}:{{ seconds }}</span>
</template>

<script>
export default {
	computed: {
		minutes() {
			var minutes = Math.floor(this.duration / 60);
			return minutes;
		},
		seconds() {
			let seconds = this.duration % 60;
			let isSingleDigit = seconds.toString().length == 1;
			if (isSingleDigit) {
				seconds = `0${seconds}`;
			}
			return seconds;
		}
	},
	props: { duration: [String, Number] }
};
</script>

<style lang="scss" scoped>
</style>