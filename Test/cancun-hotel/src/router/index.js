import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyBookings from '../views/mybookings/MyBookings.vue'
import Book from '../views/book/Book.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mybookings',
    name: 'My Bookings',
    component: MyBookings
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
