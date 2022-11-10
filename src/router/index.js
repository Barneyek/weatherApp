import { createRouter, createWebHistory } from "vue-router";
import useUserStore from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("@/views/Manage.vue"),
      beforeEnter: (to, from, next) => {
        next();
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:catchAll(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
  } else {
    const store = useUserStore();

    if (store.userLoggedIn) {
      next();
    } else {
      next({ name: "home" });
    }
  }
});

export default router;
