<template lang="pug">
#login
	h3 Login
	.row
		form.col.s12(v-on:submit.prevent="login")
			.row
				.input-field.col.s12
					input(type="email" v-model="user.email" required)
					label Email address
			.row
				.input-field.col.s12
					input(type="password" v-model="user.password" required)
					label Password
			button.btn(type="submit") Submit
			router-link.btn.grey(to="/") Cancel
</template>

<script>
export default {
	data() {
		return {
			user: {
				email: null,
				password: null
			}
		}
	},
	methods: {
		login() {
			this.$store.dispatch("login", this.user).then(docRef => {
				this.$router.push("/")
			})
		}
	}
}
</script>

