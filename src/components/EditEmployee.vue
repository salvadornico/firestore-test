<template lang="pug">
#edit-employee
	h3 Edit Employee
	.row
		form.col.s12(v-on:submit.prevent="updateEmployee")
			.row
				.input-field.col.s12
					input(type="text" v-model="employee.employee_id" disabled)
					label Employee ID #
			.row
				.input-field.col.s12
					input(type="text" v-model="employee.name" required)
					label Name
			.row
				.input-field.col.s12
					input(type="text" v-model="employee.department" required)
					label Department
				.input-field.col.s12
					input(type="text" v-model="employee.position" required)
					label Position
			button.btn(type="submit") Submit
			router-link.btn.grey(v-bind:to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}") Cancel
</template>

<script>
import db from "./firebaseInit"

export default {
	name: "edit-employee",
	computed: {
		employee() {
			return this.$store.getters.employee(this.$route.params.employee_id)
		}
	},
	mounted() {
		Materialize.updateTextFields()
	},
	methods: {
		updateEmployee() {
			this.$store.dispatch("editEmployee", this.employee).then(docRef => {
				this.$router.push({
					name: "view-employee",
					params: { employee_id: this.employee.employee_id }
				})
			})
		}
	}
}
</script>

