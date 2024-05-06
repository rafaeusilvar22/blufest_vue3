import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import useAuthUser from "src/composables/useAuthUser";
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // eslint-disable-next-line no-unused-vars
  router.beforeEach((to, from) => {
    const { user } = useAuthUser();

    // Armazenar a posição do scroll antes de navegar para a próxima página
    if (from && from.meta && from.meta.scrollY === undefined) {
      from.meta.scrollY = window.scrollY;
    }

    // Restaurar a posição do scroll ao voltar para a página anterior
    if (to.meta && to.meta.scrollY !== undefined) {
      window.scrollTo(0, to.meta.scrollY);
    }

    // if (to.hash.includes("type=recovery") && to.name !== "reset-password") {
    //   return { name: "reset-password" };
    // }

    if (user.value === null && to.meta.requiresAuth) {
      console.log("to.meta.requiresAuth:", to.meta.requiresAuth);
      return { name: "login" };
    }
  });

  return router;
});
