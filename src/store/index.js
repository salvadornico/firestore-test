import Vue from "vue"
import Vuex from "vuex"
import db from "../components/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	state: {
		employees: []
	},
	getters: {
		employees: state => state.employees,
		employee: state => employee_id =>
			state.employees.find(
				employee => employee.employee_id === employee_id
			)
	},
	mutations: {
		loadEmployees: state => {
			db
				.collection("employees")
				.orderBy("department")
				.get()
				.then(querySnapshot => {
					const result = []
					querySnapshot.forEach(doc => {
						const data = {
							id: doc.id,
							employee_id: doc.data().employee_id,
							name: doc.data().name,
							department: doc.data().department,
							position: doc.data().position
						}
						result.push(data)
					})
					state.employees = result
				})
		},
		addEmployee: (state, payload) => {
			db
				.collection("employees")
				.add({
					employee_id: payload.employee_id,
					name: payload.name,
					department: payload.department,
					position: payload.position
				})
				.then(state.employees.push(payload))
		},
		deleteEmployee: (state, payload) => {
			if (confirm("Are you sure?")) {
				db
					.collection("employees")
					.where("employee_id", "==", payload)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							doc.ref.delete()
						})
					})
					.then(docRef => {
						state.employees = state.employees.filter(
							e => e.employee_id !== payload
						)
					})
			}
		}
	},
	actions: {
		loadEmployees: async context => {
			await context.commit("loadEmployees")
		},
		addEmployee: async (context, payload) => {
			await context.commit("addEmployee", payload)
		},
		deleteEmployee: async (context, payload) => {
			await context.commit("deleteEmployee", payload)
		}
	}
})
