import { auth } from "../../firebase"

export default {
	state: {
		currentUser: {},
		isLoggedIn: false
	},
	getters: {
		currentUser: state => state.currentUser,
		isLoggedIn: state => state.isLoggedIn
	},
	mutations: {
		createAccount: (state, payload) => {
			auth
				.createUserWithEmailAndPassword(payload.email, payload.password)
				.catch(error => {
					Materialize.toast(`${error.code}: ${error.message}`, 2000)
				})

			auth.onAuthStateChanged(user => {
				if (!user) {
					return
				}

				user.updateProfile({
					displayName: payload.name
				})
			})
		},
		checkForSignIn: state => {
			auth.onAuthStateChanged(user => {
				if (user) {
					state.currentUser = user
					state.isLoggedIn = true
					Materialize.toast(`Hi ${user.displayName}!`, 2000)
				} else {
					state.isLoggedIn = false
				}
			})
		},
		login: (state, payload) => {
			auth
				.signInWithEmailAndPassword(payload.email, payload.password)
				.catch(function(error) {
					Materialize.toast(`${error.code}: ${error.message}`, 2000)
				})
		},
		logout: state => {
			auth
				.signOut()
				.then(() => {
					state.currentUser = {}
					state.isLoggedIn = false
					Materialize.toast("Sign out successful", 2000)
				})
				.catch(function(error) {
					Materialize.toast(`${error.code}: ${error.message}`, 2000)
				})
		}
	},
	actions: {
		checkForSignIn: async context => {
			await context.commit("checkForSignIn")
		},
		createAccount: async (context, payload) => {
			await context.commit("createAccount", payload)
		},
		login: async (context, payload) => {
			await context.commit("login", payload)
		},
		logout: async context => {
			await context.commit("logout")
		}
	}
}
