<template lang="pug">
#new-employee
	h3 New Employee
	.row
		form.col.s12(v-on:submit.prevent="saveEmployee")
			.row
				.input-field.col.s12
					input(type="text" v-model="employee.employee_id" required)
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
			router-link.btn.grey(to="/") Cancel
</template>

<script>
export default {
	name: "new-employee",
	data() {
		return {
			employee: {
				employee_id: null,
				name: null,
				department: null,
				position: null
			}
		}
	},
	methods: {
		saveEmployee() {
			this.$store.dispatch("addEmployee", this.employee).then(docRef => {
				this.$router.push("/")
			})
		}
	}
}
</script>

