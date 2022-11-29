<template>
    <v-app>
        <div class="Oferta de temas">
            <div class="one">
                <h1>Alumnos: Temas Ofrecidos</h1>
                <notificacion></notificacion>
            </div>
            <v-layout row class="mx-1">
                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn depressed color="#f5a42a" class="mb-5" dark small v-bind="attrs" v-on="on">
                            Ordenar
                            <v-icon right small>mdi-sort</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(item, index) in itemsOrdenar" :key="index" link>
                            <v-list-item-title @click="sortBy(item.prop)">{{
                                    item.title
                            }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-layout>
            <v-card height="500" width="100%" outlined class="overflow-y-auto">
                <v-container class="my-3">
                    <v-progress-circular :size="50" color="primary" indeterminate
                        style="position: absolute;top:20%;left: 50%;" v-if="cargando_temas == true">
                    </v-progress-circular>
                    <div v-for="project in temas" :key="project._id">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2" height="60%" width="100%"
                            v-if="project.resultado_comite == true && project.resultado_directora == true && project.colaborador == null && project.resultado_profesor == null">
                            <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                <v-flex xs8 md3>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.nombre }}</div>
                                </v-flex>
                                <v-flex xs6 md5>
                                    <div class="caption grey--text">Descripcion general proyecto</div>
                                    <div>{{ project.descripcion }}</div>
                                </v-flex>
                                <v-flex xs2 sm1 md2>
                                    <div class="caption grey--text">Creador</div>
                                    <div>{{ project.nombrecreador }}</div>
                                </v-flex>
                                <v-flex xs2 sm3 md2>
                                    <!-- <div class="caption grey--text">Durum</div> -->
                                    <div class="my-1 text-center">
                                        <v-btn @click="verSolicitud(project)">
                                            Ver Detalles
                                        </v-btn>
                                    </div>
                                </v-flex>
                                <v-flex xs6 sm1 md1>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </div>
                    <v-dialog v-model="drawerSolicitud" max-width="500">
                        <v-card max-width="500">
                            <v-card-title>
                                <span class="text-h5">Datos proyecto</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-flex>
                                        <div class="caption black--text">Proyecto:</div>
                                        <div>{{ tema_seleccionado.nombre }}</div>
                                    </v-flex>
                                    <v-flex>
                                        <div class="caption black--text">Descripción:</div>
                                        <div>{{ tema_seleccionado.descripcion }}</div>
                                    </v-flex>
                                    <v-flex>
                                        <div class="caption black--text">Creador:</div>
                                        <div>{{ tema_seleccionado.nombrecreador }}</div>
                                    </v-flex>
                                </v-container>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn @click="enviarSolicitud(tema_seleccionado._id)" color="#f5a42a">
                                    Enviar Solicitud
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="drawerContrasena" max-width="500" persistent>
                        <v-card>
                            <v-card-title class="mx-16">
                                <p>Cambio de Contraseña</p>
                            </v-card-title>
                            <v-card-text>
                                <v-col>
                                    <v-text-field v-model="verificarContraseña" class="ml-12 mr-12"
                                        label="Nueva Contraseña" :rules="ContraRules" required>>
                                    </v-text-field>
                                    <v-text-field v-model="verificarContraseñaNuevamente" class="ml-12 mr-12"
                                        label="Verificacion Contraseña" :rules="ContraRules" required
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'">
                                    </v-text-field>
                                </v-col>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="#f5a42a" :class="vBtn" class="white--text" :disabled="vBtnIngreso"
                                        @click="cambiarContraseña(verificarContraseña, verificarContraseñaNuevamente)">
                                        Guardar Cambios</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <div class="text-center" v-if="cargando_temas == false && oferta_temas == 0">
                        <h1> No hay oferta de temas</h1>
                        <v-avatar size="150">
                            <v-img src="https://media.tenor.com/-wrmUJrUbeoAAAAM/emoji-disintergrating.gif">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="white"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-avatar>
                    </div>
                </v-container>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import Swal from 'sweetalert2'
import notificacion from "@/components/notificacion.vue"
export default {
    name: "Alumno",
    data() {
        return {
            show1: false,
            drawer: null,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            profesor: null,
            estudiante: null,
            cargando_temas: true,
            tema_seleccionado: [],
            temas: [],
            oferta_temas: 0,
            itemsOrdenar: [
                { title: "Por titulo", prop: "title" },
                {
                    title: "Por profesor",
                    prop: "profesor",
                },
                {
                    title: "Por fecha",
                    prop: "fecha",
                },
            ],
            drawerContrasena: false,
            verificarContraseña: "",
            verificarContraseñaNuevamente: "",
            vBtnIngreso: true,
            errorMessages: '',
            ContraRules: [
                v => !!v || 'Este campo no puede quedar vacio',
                v => v.length >= 8 || 'Minimo 8 caracteres',
            ],

        };
    },
    created() {
        this.cargar_temas()
        this.verificar_inicio()

    },
    computed: {
        vBtn() {
            if (this.verificarContraseña == "" || this.verificarContraseñaNuevamente == "" || this.verificarContraseña == null || this.verificarContraseñaNuevamente == null
                || this.verificarContraseña.length < 8 || this.verificarContraseñaNuevamente.length < 8) {
                this.vBtnIngreso = true
            } else {
                this.vBtnIngreso = false
            }
        }
    },
    components: { Swal, notificacion },
    methods: {
        cargar_temas() {
            this.axios.get("todos_temas")
                .then((respT) => {
                    this.axios.get("todos_usuarios").then((respU) => {
                        const usuario = respU.data
                        this.temas = respT.data
                        for (var i = 0; i < this.temas.length; i++) {
                            const creador = usuario.filter(u => u._id == this.temas[i].idCreador)
                            this.temas[i].nombrecreador = creador[0].nombre
                            if (this.temas[i].resultado_comite && this.temas[i].resultado_directora && this.temas[i].colaborador == null && this.temas[i].resultado_profesor == null) {
                                this.oferta_temas++;
                            }
                        }
                        this.cargando_temas = false
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        verSolicitud(tema) {
            this.drawerSolicitud = true;
            this.tema_seleccionado = tema
        },
        enviarSolicitud(id) {
            var estado = false
            for (var i = 0; i < this.tema_seleccionado.postulantes.length; i++) {
                if (localStorage.getItem("key_user") == this.tema_seleccionado.postulantes[i].id) {
                    estado = true
                }
            }
            if (estado) {
                Swal.fire(
                    'Solicitud repetida!',
                    'No puedes enviar 2 veces la misma solicitud!',
                    'error'
                )
                this.drawerSolicitud = false
            } else {
                this.$store.state.id_tema_solicitar = id
                this.$store.state.vistaSeleccionada = 3
            }
        },
        verificar_inicio() {
            this.axios.get("todos_usuarios").then((RespU) => {
                const usuario = RespU.data
                var user = usuario.find(u => u._id == localStorage.getItem("key_user"))
                //console.log(user.contrasena)
                if (user.contrasena == "12345") {
                    this.drawerContrasena = true;
                } else {
                    this.drawerContrasena = false;
                }
            })

        },
        cambiarContraseña(contraseña, contraseñaVerificar) {
            if (contraseña == contraseñaVerificar) {
                this.$store.state.loading = true
                this.axios.get("todos_usuarios").then((respU) => {
                    const usuarios = respU.data
                    var alumno = usuarios.filter(u => u._id == localStorage.getItem("key_user"))
                    alumno[0].contrasena = contraseña
                    this.axios.put(`usuario_ac/${alumno[0]._id}`, alumno[0])
                    this.drawerContrasena = false;
                })
                this.$store.commit('cargar_datos')
                Swal.fire(
                    'Se ha cambiado la contraseña',
                    'Se ha cambiado la contraseña correctamente!',
                    'success'
                )
            } else {
                Swal.fire(
                    'Verifique las contraseñas',
                    'Las contraseñas no son iguales!',
                    'error'
                )
            }
        },

    },
}
</script>

<style>
.v-list-item:hover {
    background: #f5a42a;
}

.one h1 {
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 5px;
}

.one h1:before {
    width: 28px;
    height: 5px;
    display: block;
    content: "";
    position: absolute;
    bottom: 3px;
    left: 50%;
    margin-left: -14px;
    background-color: #f5a42a;
}

.one h1:after {
    width: 100px;
    height: 1px;
    display: block;
    content: "";
    position: relative;
    margin-top: 25px;
    left: 50%;
    margin-left: -50px;
    background-color: #f5a42a;
}
</style>
