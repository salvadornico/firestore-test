<template lang="pug">
#view-employee
	ul.collection.with-header
		li.collection-header
			h4 {{ name }}
		li.collection-item Employee ID#: {{ employee_id }}
		li.collection-item Department: {{ department }}
		li.collection-item Position: {{ position }}
	router-link.btn.grey(to="/") Back
	button.btn.red(v-on:click="deleteEmployee") Delete
	.fixed-action-btn
		router-link.btn-floating.btn-large.red(v-bind:to="{ name: 'edit-employee', params: employee_id }")
			i.fa.fa-pencil
</template>

<script>
import db from "./firebaseInit";

export default {
	name: "view-employee",
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
		},
		deleteEmployee() {
			if (confirm("Are you sure?")) {
				db
					.collection("employees")
					.where("employee_id", "==", this.$route.params.employee_id)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							doc.ref.delete();
							this.$router.push("/");
						});
					});
			}
		}
	}
};
</script>

