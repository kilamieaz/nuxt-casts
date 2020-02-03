<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	layout: "admin",

	middleware: ["auth-admin", "load-videos-and-tags"]
};
</script>