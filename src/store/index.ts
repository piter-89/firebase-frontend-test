import Vue from 'vue'
import Vuex from 'vuex'
import firebaseObj from '../firebase'

Vue.use(Vuex)
const { firebase } = firebaseObj;

export default new Vuex.Store({
  state: {
    API_URL: "https://basic-api-ts-express-firebase.herokuapp.com",
    userLogin: "",
    userVerified: false,
    userIdToken: ""
  },
  getters: {
    get_API_URL: (state): string => state.API_URL,
    get_userLogin: (state): string => state.userLogin,
    get_userVerified: (state): boolean => state.userVerified,
    get_userIdToken: (state): string => state.userIdToken
  },
  mutations: {
    set_userLogin (state, userLogin) {
      state.userLogin = userLogin;
    },
    set_userVerified (state, userVerified) {
      state.userVerified = userVerified;
    },
    set_userIdToken (state, userIdToken) {
      state.userIdToken = userIdToken;
    },
    set_clearUserData (state) {
      state.userLogin = "";
      state.userVerified = false;
      state.userIdToken = "";
    }
  },
  actions: {
    async createAccount ({ dispatch }, { email, pass }: { email: string, pass: string }) {
      try {
        var { user }: { user: firebase.User | null } = await firebase.auth().createUserWithEmailAndPassword(email, pass);
      } catch (error) {
        alert(`${error.code}: ${error.message}`);
        return;
      }

      if( user && user.emailVerified === false) {
        dispatch("sendVeryfication");
      } else {
        alert("Error in account creation");
      }
    },

    async sendVeryfication () {
      try {
        await firebase.auth().currentUser?.sendEmailVerification();
        alert("WELL DONE! Verification email sent!")
      } catch (error) {
        alert("Error: " + error);
      }
    },

    async login ({ dispatch }, { email, pass }: { email: string, pass: string }) {
      try {
        const res: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, pass);
        dispatch('getIdToken');
      } catch (err) {
        alert(`Error: ${err.code} - ${err.message}`);
      }
    },

    async getIdToken ({ commit }) {
      const idToken: string | undefined = await firebase.auth().currentUser?.getIdToken(true);
      commit('set_userIdToken', idToken ? idToken : "");
    },

    listenUserInfo ({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          commit("set_userLogin", user.email);
          commit("set_userVerified", user.emailVerified);
          dispatch('getIdToken');
        } else {
          commit("set_userLogin", "");
          commit("set_userVerified", false);
        }
      });
    },

    logout ({ commit }) {
      firebase.auth().signOut();
      commit("set_clearUserData");
    }
  },
  modules: {
  }
})
