/* eslint-disable */

import Vue from "vue"
import Router from "vue-router"
import Dashboard from "@/components/Dashboard"
import NewEmployee from "@/components/employees/NewEmployee"
import ViewEmployee from "@/components/employees/ViewEmployee"
import EditEmployee from "@/components/employees/EditEmployee"
import NewAccount from "@/components/auth/NewAccount"
import Login from "@/components/auth/Login"

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			name: "dashboard",
			component: Dashboard
		},
		{
			path: "/register",
			name: "new-account",
			component: NewAccount
		},
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/new",
			name: "new-employee",
			component: NewEmployee
		},
		{
			path: "user/:employee_id",
			name: "view-employee",
			component: ViewEmployee
		},
		{
			path: "/user/:employee_id/edit",
			name: "edit-employee",
			component: EditEmployee
		}
	]
})
