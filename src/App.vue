<template lang="pug">
#app
	Navbar
	.container
		router-view
</template>

<script>
import Navbar from "@/components/Navbar"

export default {
	name: "app",
	components: {
		Navbar
	},
	created() {
		this.$store.dispatch("loadEmployees")
		this.$store.dispatch("checkForSignIn")
	}
}
</script>
