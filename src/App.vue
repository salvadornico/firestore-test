<template lang="pug">
#app
	Navbar
	.container
		router-view
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
	name: "app",
	components: {
		Navbar
	}
};
</script>
