<template lang="pug">
#new-employee
	h3 New Employee
	.row
		form.col.s12(v-on:submit.prevent="saveEmployee")
			.row
				.input-field.col.s12
					input(type="text" v-model="employee_id" required)
					label Employee ID #
			.row
				.input-field.col.s12
					input(type="text" v-model="name" required)
					label Name
			.row
				.input-field.col.s12
					input(type="text" v-model="department" required)
					label Department
				.input-field.col.s12
					input(type="text" v-model="position" required)
					label Position
			button.btn(type="submit") Submit
			router-link.btn.grey(to="/") Cancel
</template>

<script>
import db from "./firebaseInit";

export default {
	name: "new-employee",
	data() {
		return {
			employee_id: null,
			name: null,
			department: null,
			position: null
		};
	},
	methods: {
		saveEmployee() {
			db
				.collection("employees")
				.add({
					employee_id: this.employee_id,
					name: this.name,
					department: this.department,
					position: this.position
				})
				.then(docRef => {
					this.$router.push("/");
				});
		}
	}
};
</script>

