import Login from '@/views/Login.vue'
import Chat from '@/views/Chat.vue'
import Menu from '@/views/Menu.vue'

const routes = [
  { path: '/', component: Login, name: 'login' },
  { path: '/chat', component: Chat, name: 'chat' },
  { path: '/menu', component: Menu, name: 'menu' },
]

export default routes
