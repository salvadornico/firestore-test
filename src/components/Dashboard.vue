<template lang="pug">
#dashboard
	ul.collection.with-header
		li.collection-header
			h4 Employees
		li.collection-item(v-for="employee in employees" v-bind:key="employee.id")
			.chip {{ employee.department }}
			span {{ employee.employee_id}}: {{ employee.name }}
			router-link.secondary-content(v-bind:to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}")
				i.fa.fa-eye
	.fixed-action-btn
		router-link.btn-floating.btn-large.red(to="/new")
			i.fa.fa-plus
</template>

<script>
import db from "./firebaseInit";

export default {
	name: "dashboard",
	data() {
		return {
			employees: []
		};
	},
	created() {
		db
			.collection("employees")
			.orderBy("department")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						employee_id: doc.data().employee_id,
						name: doc.data().name,
						department: doc.data().department,
						position: doc.data().position
					};
					this.employees.push(data);
				});
			});
	}
};
</script>

