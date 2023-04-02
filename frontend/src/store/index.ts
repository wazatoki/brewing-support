import { createStore } from "vuex";
import * as signInRepo from "@/repositories/signIn";
import { setAuthHeader, removeAuthHeader } from "@/repositories/axiosBase";

export default createStore({
  state: {
    authUser: null,
  },
  getters: {
    authUser: (state) => state.authUser,
  },
  mutations: {
    setAuthUser(state, AuthUser) {
      state.authUser = AuthUser;
    },
  },
  actions: {
    async signIn(context, data: { id: string; password: string }) {
      const res = await signInRepo.signIn(data);
      setAuthHeader(`Bearer ${res.jwtToken}`);
      context.commit("setAuthUser", res.appUser);
    },
    signOut(context) {
      removeAuthHeader();
      context.commit("setAuthUser", null);
    },
  },
  modules: {},
});
