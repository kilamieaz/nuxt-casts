<template>
	<v-container>
		<h1>Login</h1>
		<UserAuthForm buttonText="Login" :submitForm="loginUser"></UserAuthForm>
	</v-container>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";
export default {
	components: {
		UserAuthForm
	},
	methods: {
		async loginUser(loginInfo) {
			await this.$auth
				.loginWith("local", {
					data: loginInfo
				})
				.then(() => {
					this.$store.dispatch("snackbars/setSnackbar", {
						text: `Thanks for signing in, ${this.$auth.user.name}`
					});
					this.$router.push(`/admin/videos`);
				})
				.catch(error => {
					this.$store.dispatch("snackbars/setSnackbar", {
						text: `${error.message}`,
						color: "red"
					});
				});
		}
	}
};
</script>

<style lang="scss" scoped>
</style>