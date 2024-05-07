import { createRouter, createWebHistory } from "vue-router";
import Okrs from "../pages/okrs.vue";
import Check_in from "../pages/check-in.vue";
import Phan_hoi from "../pages/phan-hoi.vue";
import Cong_viec from "../pages/cong-viec.vue";

const routes = [
  { path: "/", component: Okrs },
  {
    path: "/check-in",
    component: Check_in,
  },
  { path: "/phan-hoi", component: Phan_hoi },
  { path: "/cong-viec", component: Cong_viec },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
