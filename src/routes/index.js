import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Register and Login
import Register from "../views/Register/RegisterView.vue";
import RegisterPartner from "../views/Register/RegisterPartner.vue";
import Login from "../views/LoginView.vue";

//Partner
import Activity from '../views/Partner/Activity.vue'
import AddProduct from '../views/Partner/AddProduct.vue'
import DashboardPartner from '../views/Partner/DashboardPartner.vue'
import ProfilePartner from '../views/Partner/ProfilePartner.vue'
import ManageEmployee from '../views/Partner/ManageEmployee.vue'
import MemberOfPartner from '../views/Partner/MemberOfPartner.vue'

// Memeber
import Home from "../views/Member/Home.vue";
import Category from "../views/Member/Category.vue";
import ProductCategory from "../views/Member/ProductCategory.vue";
import ProfileMember from "../views/Member/ProfileMember.vue";
import PartnerStores from '../views/Member/PartnerStores.vue'
import PartnerDetailView from '../views/Member/PartnerDetailView.vue'
import SubCategory from "../views/Member/SubCategory.vue";

// Component
import Bar from "../components/Bar.vue";
import Footer from "../components/Footer.vue";
import BarAdmin from "../components/BarAdmin.vue";
import BarEmployee from "../components/BarEmployee.vue";

// Oder
import RecycleOrder from "../views/Orders/RecycleOrder.vue";

const routes = [
  // Login and Register
  { path: "/register", component: Register },
  { path: "/registerpartner", component: RegisterPartner },
  { path: "/login", component: Login },

  //Partner - เพิ่ม route guard
  { 
    path: "/activity", 
    component: Activity,
    meta: { requiresAuth: true, roles: ['partner'] }
  },
  { 
    path: "/addproduct", 
    component: AddProduct,
    // meta: { requiresAuth: true, roles: ['partner'] }
  },
  { 
    path: "/dashboardpartner", 
    component: DashboardPartner,
    meta: { requiresAuth: true, roles: ['partner'] }
  },
  { 
    path: "/profilepartner", 
    component: ProfilePartner,
    meta: { requiresAuth: true, roles: ['partner'] }
  },
  { 
    path: "/manageemployee", 
    component: ManageEmployee,
    // meta: { requiresAuth: true, roles: ['partner', 'employee'] }
  },
  { 
    path: "/memberofpartner", 
    component: MemberOfPartner,
    // meta: { requiresAuth: true, roles: ['partner'] }
  },

  // Member - เข้าได้เฉพาะ member เท่านั้น
  { 
    path: "/", 
    component: Home,
    meta: { requiresAuth: true, roles: ['member'] }
  },
  { path: "/category", component: Category },
  { path: "/productcategory", name: "productcategory", component: ProductCategory },
  { path: "/profilemember", name: "productCategory", component: ProfileMember },
  { path: '/partnerstores', component: PartnerStores },
  { path: '/partnerdetail', component: PartnerDetailView },
  { path: "/subcategory", component: SubCategory },

  // Component
  { path: "/bar", component: Bar },
  { path: "/footer", component: Footer },
  { path: "/baradmin", component: BarAdmin },
  { path: "/baremployee", component: BarEmployee },

  // Order
  { path: "/recycleorder", component: RecycleOrder },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Initialize auth store ถ้ายังไม่ได้ทำ
  if (!authStore.isAuthenticated && localStorage.getItem("token")) {
    const initialized = authStore.initializeAuth();
    if (initialized) {
      console.log("Auth store initialized successfully");
    } else {
      console.log("Auth store initialization failed");
    }
  }
  
  // ตรวจสอบว่าต้องการ authentication หรือไม่
  if (to.meta.requiresAuth) {
    // ตรวจสอบว่า login แล้วหรือไม่
    if (!authStore.isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      next('/login');
      return;
    }
    
    // ตรวจสอบ role ที่อนุญาต
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = authStore.user.role;
      console.log("Required roles:", to.meta.roles);
      console.log("User role:", userRole);
      
      if (!to.meta.roles.includes(userRole)) {
        console.log("Role not allowed, redirecting");
        // ถ้าไม่มีสิทธิ์ ให้ redirect ตาม role
        if (authStore.isMember()) {
          next('/');
        } else if (authStore.isPartnerOrAdmin()) {
          next('/dashboardpartner');
        }
        return;
      }
    }
  }
  
  next();
});

export default router;
