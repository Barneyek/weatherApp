<template>
  <teleport to="body">
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      id="modal"
      :class="hiddenClass"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;
        </span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="py-4 text-left px-6">
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl font-bold">Register/Login form</p>
              <div
                class="modal-close cursor-pointer z-50"
                @click="modalVisiblity = false"
              >
                <i class="fas fa-times"></i>
              </div>
            </div>
            <ul class="flex flex-wrap mb-4">
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-2 px-4 transition"
                  :class="{
                    'hover:text-white text-white bg-blue-600': tab === 'login',
                    'hover:text-blue-600': tab === 'register',
                  }"
                  href="#"
                  @click.prevent="tab = 'login'"
                >
                  Login
                </a>
              </li>
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-3 px-4 transition"
                  href="#"
                  :class="{
                    'hover:text-white text-white bg-blue-600':
                      tab === 'register',
                    'hover:text-blue-600': tab === 'login',
                  }"
                  @click.prevent="tab = 'register'"
                >
                  Register
                </a>
              </li>
            </ul>
            <app-login-form v-if="tab === 'login'" />
            <app-register-form v-else />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";
import AppLoginForm from "@/components/LoginForm.vue";
import AppRegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Auth",
  data() {
    return {
      tab: "login",
    };
  },
  components: {
    AppLoginForm,
    AppRegisterForm,
  },
  computed: {
    ...mapState(useModalStore, ["hiddenClass"]),
    ...mapWritableState(useModalStore, {
      modalVisiblity: "isOpen",
    }),
  },
};
</script>
