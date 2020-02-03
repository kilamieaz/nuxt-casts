<template>
	<v-app>
		<v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" app clipped>
			<v-list-item class="px-2">
				<v-list-item-avatar>
					<v-img src="https://randomuser.me/api/portraits/men/85.jpg" alt="user"></v-img>
				</v-list-item-avatar>

				<v-list-item-title>{{ this.$auth.user.name}}</v-list-item-title>

				<v-btn icon @click.stop="mini = !mini">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item v-for="item in items" :key="item.title" link :to="item.link">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app clipped-left>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title to="/">Screencasts</v-toolbar-title>

			<v-spacer></v-spacer>

			<div v-if="this.$auth.loggedIn">
				{{ this.$auth.user.email }}
				<v-btn text @click="logout()">Logout</v-btn>
			</div>
			<div v-else>
				<v-btn text to="/login">Login</v-btn>
				<v-btn text to="/register">Register</v-btn>
			</div>
		</v-app-bar>

		<v-content>
			<v-container fluid>
				<v-row justify="center">
					<nuxt />
				</v-row>
			</v-container>
		</v-content>

		<v-footer app>
			<span>&copy; 2020</span>
		</v-footer>
		<v-snackbar
			v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
			:key="snackbar.text + Math.random()"
			v-model="snackbar.showing"
			:timeout="snackbar.timeout"
			:color="snackbar.color"
			:style="`bottom: ${(index * 60) + 8}px`"
		>
			{{snackbar.text}}
			<v-btn text @click="snackbar.showing = false">Close</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState({
			snackbars: state => state.snackbars.snackbars
		})
	},
	methods: {
		async logout() {
			await this.$auth.logout();
		}
	},
	data: () => ({
		drawer: null,
		mini: false,
		items: [
			{ title: "Videos", icon: "mdi-home-city", link: "/admin/videos" },
			{ title: "Tags", icon: "mdi-home-city", link: "/admin/tags" }
		]
	}),
	created() {
		this.$vuetify.theme.dark = true;
	}
};
</script>