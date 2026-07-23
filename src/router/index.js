import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "productList" */ '../views/ProductList.vue'),
  },
  {
    path: '/cartpage',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "cartPage" */ '../views/CartPage.vue'),
  },
  {
    path: '/products/:id',
    name: 'Products',
    component: () => import(/* webpackChunkName: "productDetails" */ '../views/ProductDetails.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
