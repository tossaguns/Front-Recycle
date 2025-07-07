import { createRouter, createWebHistory } from "vue-router";

import Register from "../views/Register/RegisterView.vue";
import Login from "../views/LoginView.vue";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import RegisterPartner from "../views/Register/RegisterPartner.vue";

//Partner
import PartnerDetailView from '../views/Partner/PartnerDetailView.vue'

import Activity from '../views/Admin/Activity.vue'

// Memeber
import ProductCategory from "../views/Member/ProductCategory.vue";
import ProfileMember from "../views/Member/ProfileMember.vue";
import PartnerStores from '../views/Member/PartnerStores.vue'


import Bar from "../components/Bar.vue";
import Footer from "../components/Footer.vue";

// Oder
import RecycleOrder from "../views/Orders/RecycleOrder.vue";

const routes = [
  { path: "/login", component: Login },

  { path: "/", component: Home },
  { path: "/category", component: Category },
  { path: "/register", component: Register },
  { path: "/registerpartner", component: RegisterPartner },

  //Partner
  { path: '/partnerdetail/:id', component: PartnerDetailView },

  {path : "/activity" , component : Activity},

  // Member
  { path: "/productcategory", name: "productcategory", component: ProductCategory },
  { path: "/profilemember", name: "productCategory", component: ProfileMember },
  { path: '/partnerstores', component: PartnerStores },

  // Bar
  { path: "/bar", component: Bar },
  { path: "/footer", component: Footer },

  // Order
  { path: "/recycleorder", component: RecycleOrder },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
