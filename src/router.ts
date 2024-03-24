import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { usePiniaStore } from "./pinia";
import { storeToRefs } from "pinia";
import { inject } from "vue";

const modelList = Object.keys(import.meta.glob("../public/*.glb")).map(
  (key) => {
    return key.replace("../public/", "").replace(".glb", "");
  }
);

const NotFound = () => import("./components/NotFound.vue");
const ViewModel = () => import("./components/ViewModel.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/3d-model/:model",
    name: "ViewModel",
    component: ViewModel,
    beforeEnter: (to, _from, next) => {
      let model =
        typeof to.params.model === "string"
          ? to.params.model
          : to.params.model[0];
      if (modelList.includes(model)) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/3d-model/",
    name: "NotFound",
    component: NotFound,
  },
  // Redirect to NotFound if no route matches
  {
    path: "/3d-model/:pathMatch(.*)*",
    redirect: { name: "NotFound" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  inject("global");
  const { loading } = storeToRefs(usePiniaStore());
  loading.value = true;
});

export default router;
