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
			await this.$axios.post("/register", registerInfo).then(() =>
				this.$auth.loginWith("local", {
					data: { registerInfo }
				})
			);
		}
	}
};
</script>

<style lang="scss" scoped>
</style>