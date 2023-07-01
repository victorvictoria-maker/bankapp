import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import SignUp from '../views/SignUp.vue';
import DashBoard from '../views/DashBoard.vue';
import Login from '../views/LoginPage.vue';
import AddMoney from '../views/AddMoney.vue';
import SendMoney from '../views/SendMoney.vue';
import WithdrawMoney from '../views/WithdrawMoney.vue';
import TransactionHistory from '../views/TransactionHistory.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard/:accountno',
    name: 'dashboard',
    component: DashBoard
  },
  {
    path: '/addmoney/:accountno',
    name: 'add',
    component: AddMoney
  },
  {
    path: '/sendmoney/:accountno',
    name: 'send',
    component: SendMoney
  },
  {
    path: '/withdrawmoney/:accountno',
    name: 'withdraw',
    component: WithdrawMoney
  },
  {
    path: '/transactions/:accountno',
    name: 'transactions',
    component: TransactionHistory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
