<template>
    <div>
        <header>
            <nav>
                <ul>
                    <li><a @click="cerrarSesion">Cerrar sesion</a></li>
                    <li><a @click="$router.push('/menu')">Menu</a></li>
                </ul>
            </nav>
        </header>
        <div class="container-padre">
            <div class="container">
                <div class="form" v-if="list == true">
                    <p class="heading">Amigos <br /><button class="btn" @click="list = false">Agregar amigos</button></p>
                    <div v-for="(friend, index) in friends" :key="index">
                        <p>Nombre: {{ friend.contacto_user.name }}</p>
                        <p>Correo: {{ friend.contacto_user.email }}</p>
                        <button @click="chat(friend)">Chatear</button>
                    </div>
                </div>
                <div class="form" v-else>
                    <p class="heading">Usuarios <br /><button class="btn" @click="list = true">Ver amigos</button></p>
                    <div v-for="(user, index) in users" :key="index">
                        <div v-if="verificarme(user)"">
                                    <p>Nombre: {{ user.name }}</p>
                                    <p>Correo: {{ user.email }}</p>
                                    <button @click="addFriend(user)" v-if="verificarUser(user.contactos)">Agregar</button>
                            <p v-else>Ya son amigos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            friends: [],
            users: [],
            list: true
        }
    },
    mounted() {
        axios.get(`http://127.0.0.1:8000/api/contacto`, {
            headers: {'Authorization': `Bearer ${localStorage.token}`}
        })
            .then(resp => {
                this.friends = resp.data
            })
            .catch(error => {
                //   alert('Credenciales no validas')
            })
    },
    watch: {
        list() {
            switch (this.list) {
                case false:
                    axios.get(`http://127.0.0.1:8000/api/user`, {
                        headers: {'Authorization': `Bearer ${localStorage.token}`}
                    })
                        .then(resp => {
                            this.users = resp.data
                        })
                        .catch(error => {
                            //   alert('Credenciales no validas')
                        })
                    break;
                default:
                    axios.get(`http://127.0.0.1:8000/api/contacto`, {
                        headers: {'Authorization': `Bearer ${localStorage.token}`}
                    })
                        .then(resp => {
                            this.friends = resp.data
                        })
                        .catch(error => {
                            //   alert('Credenciales no validas')
                        })
                    break;
            }
        }
    },
    methods: {
        cerrarSesion() {
            axios.post(`http://127.0.0.1:8000/api/logout`, null, {
                        headers: {'Authorization': `Bearer ${localStorage.token}`}
                    })
                    localStorage.clear()
            this.$router.push('/')
        },
        verificarme(user) {
            if (user.id == localStorage.id) return false
            return true
        },
        verificarUser(contactos) {
            const dd = contactos.find(e => e.users_id == localStorage.id)
            if (dd) return false
            return true
        },
        addFriend(user) {
            axios.post(`http://127.0.0.1:8000/api/contacto`, { contactos_id: user.id }, {
                headers: {'Authorization': `Bearer ${localStorage.token}`}
            })
                .then(resp => {
                    this.list = true
                })
                .catch(error => {
                    //   alert('Credenciales no validas')
                })
        },
        chat(user) {
            localStorage.destinatario = user.contacto_user.id
            this.$router.push('/chat')
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