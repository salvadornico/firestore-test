<template lang="pug">
nav
	.nav-wrapper.green
		.container
			router-link.brand-logo.left(to="/") Employee Manager
		ul.right
			li(v-if="isLoggedIn") {{ currentUser.email }}
			li(v-if="isLoggedIn")
				button.btn(v-on:click="logout") Sign Out
			li(v-if="!isLoggedIn")
				router-link(to="/login") Login
			li(v-if="!isLoggedIn")
				router-link(to="/register") Register
</template>

<script>
export default {
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn
		},
		currentUser() {
			return this.$store.getters.currentUser
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("logout")
		}
	}
}
</script>
