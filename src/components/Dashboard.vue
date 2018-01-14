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
export default {
	name: "dashboard",
	computed: {
		employees() {
			return this.$store.getters.employees
		}
	}
}
</script>

