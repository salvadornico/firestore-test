<template lang="pug">
#view-employee
	ul.collection.with-header
		li.collection-header
			h4 {{ employee.name }}
		li.collection-item Employee ID#: {{ employee.employee_id }}
		li.collection-item Department: {{ employee.department }}
		li.collection-item Position: {{ employee.position }}
	router-link.btn.grey(to="/") Back
	button.btn.red(v-on:click="deleteEmployee") Delete
	.fixed-action-btn
		router-link.btn-floating.btn-large.red(v-bind:to="{ name: 'edit-employee', params: employee.employee_id }")
			i.fa.fa-pencil
</template>

<script>
import db from "./firebaseInit"

export default {
	name: "view-employee",
	computed: {
		employee() {
			return this.$store.getters.employee(this.$route.params.employee_id)
		}
	},
	methods: {
		deleteEmployee() {
			if (confirm("Are you sure?")) {
				db
					.collection("employees")
					.where("employee_id", "==", this.$route.params.employee_id)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							doc.ref.delete()
							this.$router.push("/")
						})
					})
			}
		}
	}
}
</script>

