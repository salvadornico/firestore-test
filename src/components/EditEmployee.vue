<template lang="pug">
#edit-employee
	h3 Edit Employee
	.row
		form.col.s12(v-on:submit.prevent="updateEmployee")
			.row
				.input-field.col.s12
					input(type="text" v-model="employee_id" disabled)
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
	name: "edit-employee",
	data() {
		return {
			employee_id: null,
			name: null,
			department: null,
			position: null
		};
	},
	beforeRouteEnter(to, from, next) {
		db
			.collection("employees")
			.where("employee_id", "==", to.params.employee_id)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					next(vm => {
						vm.employee_id = doc.data().employee_id;
						vm.name = doc.data().name;
						vm.department = doc.data().department;
						vm.position = doc.data().position;
					});
				});
			});
	},
	watch: {
		$route: "fetchData"
	},
	methods: {
		fetchData() {
			db
				.collection("employees")
				.where("employee_id", "==", this.$route.params.employee_id)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						this.employee_id = doc.data().employee_id;
						this.name = doc.data().name;
						this.department = doc.data().department;
						this.position = doc.data().position;
					});
				});

			Materialize.updateTextFields();
		},
		updateEmployee() {
			db
				.collection("employees")
				.where("employee_id", "==", this.$route.params.employee_id)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						doc.ref
							.update({
								employee_id: this.employee_id,
								name: this.name,
								department: this.department,
								position: this.position
							})
							.then(() => {
								this.$router.push({
									name: "view-employee",
									params: { employee_id: this.employee_id }
								});
							});
					});
				});
		}
	}
};
</script>

