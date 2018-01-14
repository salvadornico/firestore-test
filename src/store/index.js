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
		}
	},
	actions: {
		loadEmployees: async context => {
			await context.commit("loadEmployees")
		}
	}
})
