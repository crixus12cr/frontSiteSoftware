<template>
  <div>
    <p @click="$router.push('/menu')">{{ '<' }} Volver</p>
    <div class="contenedor">
      <div v-for="(mensaje, index) in messages" :key="index">
        <div class="container-message" v-if="user_id != mensaje.users_id">
          <div class="group-message">
            <div class="message">
              {{ mensaje.mensaje }}
            </div>
          </div>
        </div>
        <div class="container-message-me" v-else>
          <div class="group-message-me">
            <div class="message-me">
              {{ mensaje.mensaje }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contenedor-search">
      <input type="text" v-model="mensaje" @keyup.enter="enviarMensaje">
      <button class="btn" @click="enviarMensaje">Enviar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const headers = {
  'Authorization': `Bearer ${localStorage.token}`
}
export default {
  data() {
    return {
      messages: [],
      mensaje: '',
      user_id: 0,
    }
  },
  created() {
    this.$pusher.subscribe('my-channel').bind('my-event', data => {
      console.log(data);
    });
    this.verMensaje();
    this.user_id = localStorage.id
  },
  methods: {
    enviarMensaje() {
      axios.post(`http://127.0.0.1:8000/api/enviar-mensaje`, { contactos_id: localStorage.destinatario, mensaje: this.mensaje }, {
        headers: {'Authorization': `Bearer ${localStorage.token}`}
      })
        .then(resp => {
          this.mensaje = ''
          this.verMensaje()
        })
        .catch(error => {
          //   alert('Credenciales no validas')
        })
    },
    verMensaje() {
      axios.post(`http://127.0.0.1:8000/api/ver-mensaje`, { contactos_id: localStorage.destinatario }, {
        headers: {'Authorization': `Bearer ${localStorage.token}`}
      })
        .then(resp => {
          this.messages = resp.data
          console.log(resp.data);
        })
        .catch(error => {
          //   alert('Credenciales no validas')
        })
    }
  }
}
</script>

<style scoped>
.contenedor-search {
  width: 30rem;
  background-color: bisque;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 2rem;
}

.contenedor-search input {
  width: 100%;
  height: 2rem;
  border: none;
  margin-right: 1rem;
}

.contenedor {
  width: 30rem;
  height: 65vh;
  background-color: bisque;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  padding: 2rem;
  overflow-y: auto;
}

.user-img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: aquamarine;
  color: #000;
  display: inline-block;
  position: relative;
  user-select: none;
  align-self: flex-start;
}

.user-img-me {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: aquamarine;
  color: #000;
  display: inline-block;
  position: relative;
  user-select: none;
  align-self: flex-start;
}

.user-img span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.message {
  display: inline-block;
  background-color: #202c33;
  color: #fff;
  padding: 1rem;
  margin-bottom: .5rem;
  width: 100%;
}

.message-me {
  display: inline-block;
  background-color: #066e20;
  color: #fff;
  padding: 1rem;
  margin-bottom: .5rem;
  width: 100%;
}

.container-message {
  display: flex;
}

.container-message-me {
  display: flex;
}

.group-message {
  width: calc(100% - 8rem);
  margin-left: 5rem;
  position: relative;
  margin-left: 2.8rem;
  margin-top: 1rem;
  position: relative;
}

.group-message-me {
  width: calc(100% - 8rem);
  margin-left: 5rem;
  position: relative;
  margin-left: 7rem;
  margin-top: 1rem;
  position: relative;
}

.group-message::before {
  content: '';
  position: absolute;
  top: 0;
  left: -30px;
  width: 6rem;
  height: 6rem;
  background-color: #202c33;
  clip-path: polygon(32% 0, 0 0, 32% 22%);
}

.contenedor::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.contenedor::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
.contenedor::-webkit-scrollbar-thumb {
  background: #202c33c5;
  border-radius: 10px;
}

/* Handle on hover */
.contenedor::-webkit-scrollbar-thumb:hover {
  background: #202c33;
}
</style>