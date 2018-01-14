<template lang="pug">
#new-account
	h3 Register
	.row
		form.col.s12(v-on:submit.prevent="createAccount")
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
	name: "new-account",
	data() {
		return {
			user: {
				email: null,
				password: null
			}
		}
	},
	methods: {
		createAccount() {
			this.$store.dispatch("createAccount", this.user).then(docRef => {
				this.$router.push("/")
			})
		}
	}
}
</script>

