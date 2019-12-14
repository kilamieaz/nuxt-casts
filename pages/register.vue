<template>
	<v-container>
		<h1>Register</h1>
		<UserAuthForm buttonText="Register" :submitForm="registerUser" hasName="true"></UserAuthForm>
	</v-container>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";
export default {
	components: {
		UserAuthForm
	},
	methods: {
		async registerUser(registerInfo) {
			await this.$axios.post("/register", registerInfo);

			await this.$auth
				.loginWith("local", {
					data: registerInfo
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