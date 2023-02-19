import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BrewingRecord from "@/views/BrewingRecord.vue";
import MasterUnit from "@/views/MasterUnit.vue";
import MasterIngredient from "@/views/MasterIngredient.vue";
import MasterIngredientGrain from "@/views/MasterIngredientGrain.vue";
import MasterIngredientHop from "@/views/MasterIngredientHop.vue";
import MasterIngredientYeast from "@/views/MasterIngredientYeast.vue";
import MasterIngredientClassification from "@/views/MasterIngredientClassification.vue";
import MasterSupplier from "@/views/MasterSupplier.vue";
import ReportIngredient from "@/views/ReportIngredient.vue";
import StocksRecieving from "@/views/StocksRecieving.vue";
import InventoryIndex from "@/views/InventoryIndex.vue";
import BrewPlan from "@/views/BrewPlan.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/brewing-record",
    name: "BrewingRecord",
    component: BrewingRecord,
  },
  {
    path: "/master-unit",
    name: "unitMaster",
    component: MasterUnit,
  },
  {
    path: "/master-ingredient",
    name: "ingredientMaster",
    component: MasterIngredient,
  },
  {
    path: "/master-grain",
    name: "ingredientMasterGrain",
    component: MasterIngredientGrain,
  },
  {
    path: "/master-hop",
    name: "ingredientMasterHop",
    component: MasterIngredientHop,
  },
  {
    path: "/master-yeast",
    name: "ingredientMasterYeast",
    component: MasterIngredientYeast,
  },
  {
    path: "/master-ingredient-classification",
    name: "ingredientClassificationMaster",
    component: MasterIngredientClassification,
  },
  {
    path: "/master-supplier",
    name: "supplierMaster",
    component: MasterSupplier,
  },

  {
    path: "/report-ingredient",
    name: "ingredientReport",
    component: ReportIngredient,
  },
  {
    path: "/stocks-recieving",
    name: "recievedIngredient",
    component: StocksRecieving,
  },
  {
    path: "/inventory",
    name: "inventory-index",
    component: InventoryIndex,
  },
  {
    path: "/brew-plan",
    name: "brew-plan-index",
    component: BrewPlan,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
