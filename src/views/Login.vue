<template>
  <div class="container-padre">
    <div class="container">
      <div class="form" v-if="registro == false">
        <p class="heading">Login</p>
        <input class="input" placeholder="Email" v-model="email" type="email">
        <input class="input" placeholder="Password" v-model="password" type="password">
        <hr />
        <p @click="registro = true" style="cursor: pointer; text-align: center;">Registrarse</p>
        <button class="btn" @click="submit" @keyup.enter="submit">Submit</button>
      </div>
      <div class="form" v-if="registro == true">
        <p class="heading">Registrarse</p>
        <input class="input" placeholder="Nombre" v-model="name" type="text">
        <input class="input" placeholder="Email" v-model="emailR" type="email">
        <input class="input" placeholder="Password" v-model="passwordR" type="password">
        <hr />
        <p @click="registro = false" style="cursor: pointer; text-align: center;">Iniciar sesion</p>
        <button class="btn" @click="submitR" @keyup.enter="submitR">Submit</button>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import axios from 'axios';
export default {
  data() {
    return {
      email: null,
      password: null,
      emailR: null,
      passwordR: null,
      name: null,
      registro: false,
    }
  },
  mounted() {
    localStorage.clear()
  },
  methods: {
    submit() {
      const data = {
        email: this.email,
        password: this.password
      }
      axios.post(`http://127.0.0.1:8000/api/login`, data)
        .then(resp => {
          localStorage.token = resp.data.authorisation.token
          localStorage.id = resp.data.user.id
          localStorage.name = resp.data.user.name
          this.$router.push('/Menu')
        })
        .catch(error => {
          alert('Credenciales no validas')
        })
    },
    submitR() {
      if(this.passwordR.length < 6) return alert('La contraseña tiene que tener mas de 6 caracteres')
      const data = {
        email: this.emailR,
        password: this.passwordR,
        name: this.name,
      }
      axios.post(`http://127.0.0.1:8000/api/register`, data)
        .then(resp => {
          alert('Usuario creado correctamente')
          this.registro = false
        })
        .catch(error => {
          alert('Credenciales no validas')
        })
    }
  }
}
</script>
<style>
.container-padre {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  padding-top: 10%;
  width: 100px;
  height: 100px;
  width: 30%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 2.5em;
  border-radius: 25px;
  transition: .4s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.4) 1px 2px 2px;
}

.form:hover {
  transform: translateX(-0.5em) translateY(-0.5em);
  border: 1px solid #171717;
  box-shadow: 10px 10px 0px #666666;
}

.heading {
  color: black;
  padding-bottom: 2em;
  text-align: center;
  font-weight: bold;
}

.input {
  border-radius: 5px;
  border: 1px solid whitesmoke;
  background-color: whitesmoke;
  outline: none;
  padding: 0.7em;
  transition: .4s ease-in-out;
}

.input:hover {
  box-shadow: 6px 6px 0px #969696,
    -3px -3px 10px #ffffff;
}

.input:focus {
  background: #ffffff;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
}

.form .btn {
  margin-top: 2em;
  align-self: center;
  padding: 0.7em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
  border: none;
  color: black;
  transition: .4s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
}

.form .btn:hover {
  box-shadow: 6px 6px 0px #969696,
    -3px -3px 10px #ffffff;
  transform: translateX(-0.5em) translateY(-0.5em);
}

.form .btn:active {
  transition: .2s;
  transform: translateX(0em) translateY(0em);
  box-shadow: none;
}
</style>