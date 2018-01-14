import Vue from "vue"
import Vuex from "vuex"
import employees from "./modules/employees"
import users from "./modules/users"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		employees,
		users
	}
})
