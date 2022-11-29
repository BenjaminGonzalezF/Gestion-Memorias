<template>
    <div class="Solicitudes">
        <div class="one">
            <h1>Direccion de Escuela: Temas de Memorias</h1>
            <notificacion></notificacion>
        </div>
        <v-layout row class="mx-1">
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="toggle" dense class="mr-2" style="max-height: 20px !important">
                <v-btn small color="#f5a42a" :disabled="toggle === 0">
                    <v-icon class="white--text">mdi-view-agenda</v-icon>
                </v-btn>
                <v-btn small color="#f5a42a" :disabled="toggle === 1">
                    <v-icon class="white--text">mdi-view-grid</v-icon>
                </v-btn>
            </v-btn-toggle>
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
            <v-container>
                <v-sheet height="1000" class="overflow-hidden" style="position: relative;"
                    v-if="!this.$store.state.loading && this.$store.state.ingresoUsuario && this.$store.state.esdirector">
                    <v-progress-circular :size="50" color="primary" indeterminate
                        style="position: absolute;top:20%;left: 50%;" v-if="cargando_tema == true">
                    </v-progress-circular>
                    <div>
                        <v-container class="my-3">
                            <div v-for="(project, index) in temas" :key="index">
                                <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2"
                                    v-if="project.resultado_comite == true && project.resultado_directora == null">

                                    <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                        <v-flex xs8 md2>
                                            <div class="caption grey--text">Titulo proyecto</div>
                                            <div>{{ project.nombre }}</div>
                                        </v-flex>
                                        <v-flex xs6 md3>
                                            <div class="caption grey--text">Descripcion general proyecto</div>
                                            <div>{{ project.descripcion }}</div>
                                        </v-flex>
                                        <v-flex xs2 sm1 md2>
                                            <div class="caption grey--text">Creador</div>
                                            <div>{{ project.nombrecreador }}</div>
                                        </v-flex>

                                        <v-flex xs6 sm4 md1>
                                            <div class="caption grey--text">fecha</div>
                                            <div>{{ project.fechacambio }}</div>
                                        </v-flex>
                                        <v-flex xs2 sm3 md2>
                                            <!-- <div class="caption grey--text">Durum</div> -->
                                        </v-flex>
                                        <v-flex xs6 sm1 md1>
                                            <v-tooltip top>
                                                <template v-slot:activator="{}">
                                                    <div class="text-xs-center">
                                                        <div>
                                                            <v-spacer></v-spacer>
                                                            <v-card-actions>
                                                                <!-- <v-container class="mx-auto mb-n5"> <strong> {{ oferta.alumno }}</strong></v-container> -->
                                                                <v-btn class="white--text" color="green darken-1" small
                                                                    @click="votar_solicitud(true, project)">aceptar
                                                                </v-btn>
                                                                <v-btn class="white--text" color="red lighten-2" small
                                                                    @click="votar_solicitud(false, project)">rechazar
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </div>
                                                    </div>

                                                </template>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </div>
                        </v-container>
                    </div>
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
                    <div class="text-center" v-if="cargando_tema == false && temas_pendientes == 0">
                        <h1> No tienes Solicitudes pendientes</h1>
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
                </v-sheet>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import loading from "@/components/loading.vue"
import notificacion from "@/components/notificacion.vue"
export default {
    name: 'Solicitudes',
    data() {
        return {
            toggle: null,
            drawer: null,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            fecha: null,
            cargando_tema: true,
            temas: [],
            temas_pendientes: 0,
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'title' },
                {
                    title: 'Por creador',
                    prop: 'person',
                },
                {
                    title: 'Por fecha',
                    prop: 'fecha',
                },
            ],
            items: [
                { title: "Mis solicitudes", icon: "mdi-folder" },
                { title: "Estudiantes", icon: "mdi-account-multiple" },
                { title: "Cerrar sesion", icon: "mdi-forum" },
            ],
            ContraRules: [
                v => !!v || 'Este campo no puede quedar vacio',
                v => v.length >= 8 || 'Minimo 8 caracteres',
            ],
            drawerContrasena: false,
            verificarContraseña: "",
            verificarContraseñaNuevamente: "",
            vBtnIngreso: true,
            errorMessages: '',
            show1: false,
        };
    },
    components: {
        loading,
        Swal,
        notificacion
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
    methods: {
        enviarNotificacion(tema_votado, voto) {
            var notificacion = {
                notificacion: null,
                visto: false,
                id_ref: null
            }
            if(voto){
                // Notificacion a la directora
                notificacion.id_ref = localStorage.getItem("key_user")
                notificacion.notificacion = "Has aprobado el tema " + tema_votado.nombre
                this.axios.post("nuevo_notificacion", notificacion)
                // Notificacion al creador del tema
                notificacion.id_ref = tema_votado.idCreador
                notificacion.notificacion = "La directora a aprobado tu tema " + tema_votado.nombre
                this.axios.post("nuevo_notificacion", notificacion)
                // Si el tema lo creo un alumno, hay que enviarle la notificacion al profesor el cual selecciono
                if(tema_votado.colaborador!=null){
                    notificacion.id_ref = tema_votado.colaborador
                    notificacion.notificacion = "Tienes una solicitud del tema " + tema_votado.nombre
                    this.axios.post("nuevo_notificacion", notificacion)
                }
            }else{
                // Notificacion a la directora
                notificacion.id_ref = localStorage.getItem("key_user")
                notificacion.notificacion = "Has rechazado el tema " + tema_votado.nombre
                this.axios.post("nuevo_notificacion", notificacion)
                // Notificacion al creador del tema
                notificacion.id_ref = tema_votado.idCreador
                notificacion.notificacion = "La directora a rechazado tu tema " + tema_votado.nombre
                this.axios.post("nuevo_notificacion", notificacion)
            }
        },
        cargar_temas() {
            this.axios.get("todos_usuarios").then((respU) => {
                this.axios.get("todos_temas").then((respT) => {
                    const usuarios = respU.data
                    this.temas = respT.data
                    for (var i = 0; i < this.temas.length; i++) {
                        var creador = usuarios.filter(u => u._id == this.temas[i].idCreador)
                        this.temas[i].nombrecreador = creador[0].nombre
                        if (this.temas[i].resultado_comite == true && this.temas[i].resultado_directora == null) {
                            this.temas_pendientes++
                        }
                    }
                    this.cargando_tema = false
                }).catch((e) => {
                    console.log(e)
                })
            }).catch((e) => {
                console.log(e)
            })
        },
        votar_solicitud(voto, tema) {
            Swal.fire({
                title: 'Estas seguro?',
                text: "No se podran revertir los cambios!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.state.loading = true
                    tema.resultado_directora = voto
                    this.enviarNotificacion(tema,voto)
                    this.axios.put(`tema_ac/${tema._id}`, tema).then((resp) => {
                    })
                    this.$store.commit('cargar_datos')
                    Swal.fire(
                        'Voto realizado!',
                        'Has votado correctamente.',
                        'success'
                    )
                }
            })

        },
        verSolicitud(id, titulo, descripcion, estudiante, fecha) {
            this.drawerSolicitud = true
            this.tituloProyecto = titulo
            this.descripcionProyecto = descripcion
            this.estudiante = estudiante
            this.fecha = fecha
        },
        getChipColor(color) {
            if (color == 'completado') return 'green accent-3'
            else if (color == 'en progreso') return 'orange accent-2'
            else if (color == 'atrasado') return 'red accent-2'
        },
        getsolicitudestatus(status) {
            if (status == 'completado') return 'Completado'
            else if (status == 'en progreso') return 'En progreso'
            else if (status == 'atrasado') return 'Atrasado'
        },

        redirigir(ref) {
            if (ref == "Mis solicitudes") {
                if (this.$route.path !== "/profesor") {
                    this.$router.push({ path: "/profesor" })
                }
            } else if (ref == "Estudiantes") {
                if (this.$route.path !== "/directora/estudiantes") {
                    this.$router.push({ path: "/directora/estudiantes" })
                }
            } else {
                if (this.$route.path !== "/") {
                    this.$router.push({ path: "/" })
                }
                localStorage.clear()
            }
        },
        verificar_inicio() {
            this.axios.get("todos_usuarios").then((RespU) => {
                const usuario = RespU.data
                var user = usuario.find(u => u._id == localStorage.getItem("key_user"))
                //console.log(user.contrasena)
                if (user.contrasena == "12345") {
                    //console.log("nuevo")
                    this.drawerContrasena = true;
                } else {
                    this.drawerContrasena = false;
                    //console.log("viejo")
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
        }
    }


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