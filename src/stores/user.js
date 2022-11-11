import { defineStore } from "pinia";
import { auth, usersCollection } from "@/firebase/firebaseInit";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
      });

      await userCred.user.updateProfile({
        displayName: values.name,
      });

      this.userLoggedIn = true;
      window.location.reload();
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      this.userLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();
      this.userLoggedIn = false;
    },
  },
});
