<template>
  <div
    class="relative flex items-center flex-col bg-regal-blue font-['Roboto'] min-h-screen"
  >
    <router-view />
  </div>
  <a
    v-if="!userStore.userLoggedIn"
    class="absolute top-6 right-10 bg-white px-4 py-2 rounded-md text-regal-blue font-bold transition-bg ease-in-out duration-300 hover:bg-light hover:text-white"
    href="#"
    @click.prevent="toggleAuthModal"
  >
    Login / Register
  </a>
  <a
    v-else
    class="absolute top-6 right-10 bg-white px-4 py-2 rounded-md text-regal-blue font-bold transition-bg ease-in-out duration-300 hover:bg-light hover:text-white"
    href="#"
    @click.prevent="userStore.signOut"
  >
    Logout
  </a>
  <auth />
</template>

<script>
import { mapStores, mapWritableState } from "pinia";
import UseModalStore from "@/stores/modal";
import Auth from "@/components/Auth.vue";
import useUserStore from "@/stores/user";
import { auth } from "./firebase/firebaseInit";

export default {
  name: "App",
  components: {
    Auth,
  },
  computed: {
    ...mapStores(UseModalStore, useUserStore),
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
  },
};
</script>
