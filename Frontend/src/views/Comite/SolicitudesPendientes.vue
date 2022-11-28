<template>
    <div class="Solicitudes">
        <div class="one">
            <h1>Comité Curricular: Solicitudes de Memoria Pendientes</h1>
        </div>
        <notificacion></notificacion>
        <v-layout row class="mx-1">
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed color="rgb(0, 204, 255)" class="mb-5" dark small v-bind="attrs" v-on="on">
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
                <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
                    <v-progress-circular :size="50" color="primary" indeterminate
                        style="position: absolute;top:20%;left: 50%;" v-if="cargando_temas == true">
                    </v-progress-circular>
                    <div>
                        <v-container class="my-3">
                            <div v-for="project in temas" :key="project._id">
                                <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2"
                                    v-if="project.resultado_comite == null">
                                    <v-layout row wrap :class="`pa- project ${project.estadovalido}`">
                                        <v-flex xs8 md2>
                                            <div class="caption grey--text">Titulo proyecto</div>
                                            <div>{{ project.nombre }}</div>
                                        </v-flex>
                                        <v-flex xs2 sm1 md2>
                                            <div class="caption grey--text">Creador</div>
                                            <div>{{ project.nombreCreador }}</div>
                                        </v-flex>
                                        <v-flex xs6 sm4 md1>
                                            <div class="caption grey--text">fecha</div>
                                            <div>{{ project.fechacambio }}</div>
                                        </v-flex>
                                        <v-flex xs2 sm3 md2>
                                            <!-- <div class="caption grey--text">Durum</div> -->
                                            <div class="my-1 text-center">
                                                <v-btn
                                                    @click="verSolicitud(project.nombre, project.descripcion, project.nombreCreador, project.fechacambio)">
                                                    Ver más
                                                </v-btn>
                                            </div>
                                        </v-flex>
                                        <v-flex xs6 sm1 md1>
                                            <v-btn fab text small color="green accent-2" class="mt-1"
                                                @click="confirmacion(project._id, 'aceptar')"
                                                :disabled="project.voto_usuario_sesion !== null">
                                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                                                <!-- @click="aceptarProyecto(project.id)" -->
                                            </v-btn>
                                        </v-flex>

                                        <v-flex xs6 sm1 md1>
                                            <v-btn fab text small color="red accent-2" class="mt-1"
                                                @click="confirmacion(project._id, 'denegar')"
                                                :disabled="project.voto_usuario_sesion !== null">
                                                <v-icon>mdi-cancel</v-icon>
                                                <!-- @click="deleteProject(project.id)" -->
                                            </v-btn>
                                        </v-flex>
                                        <v-flex>
                                            <div class="caption grey--text">Votos</div>
                                            <v-tooltip bottom v-for="(voto, index) in project.votos" :key="index">
                                                <template v-slot:activator="{ on, attrs }" v-if="voto.voto !== null">
                                                    <v-avatar size="30" v-bind="attrs" v-on="on">
                                                        <img :src="voto.imgcomite" v-if="voto.voto !== null" />
                                                    </v-avatar>
                                                </template>
                                                <span v-if="voto.voto === true">{{ voto.nombrecomite }} =
                                                    Aceptado</span>
                                                <span v-if="voto.voto === false">{{ voto.nombrecomite }} =
                                                    Rechazado</span>

                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </div>
                            <v-dialog v-model="drawerSolicitud" max-width="900">
                                <v-container class="grey lighten-5">
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5">Datos proyecto</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-flex>
                                                    <div class="caption black--text">Titulo proyecto:</div>
                                                    <div>{{ tituloProyecto }}</div>
                                                </v-flex>
                                                <v-flex>
                                                    <div class="caption black--text">Descripcion general proyecto:
                                                    </div>
                                                    <div>{{ descripcionProyecto }}</div>
                                                </v-flex>
                                                <v-flex>
                                                    <div class="caption black--text">Creador:</div>
                                                    <div>{{ estudiante }}</div>
                                                </v-flex>

                                                <v-flex>
                                                    <div class="caption black--text">fecha:</div>
                                                    <div>{{ fecha }}</div>
                                                </v-flex>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </v-container>
                            </v-dialog>
                        </v-container>
                    </div>
                    <div class="text-center" v-if="cargando_temas == false && temas_disponibles == 0">
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
import loading from '@/components/loading.vue';
import jsPDF from 'jspdf'
import notificacion from "@/components/notificacion.vue"
export default {
    name: 'Solicitudes',
    components: {
        loading,
        notificacion
    },
    data() {
        return {
            drawer: null,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            fecha: null,
            toggle: null,
            temas: [],
            temas_disponibles: null,
            cargando_temas: true,
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'title' },
                {
                    title: 'Por creador',
                    prop: 'creador',
                },
                {
                    title: 'Por fecha',
                    prop: 'fecha',
                },
            ],
        };
    },
    created() {
        this.cargar_temas()
    },
    methods: {
        enviarNotificacion(tema_votado, tema_estado, nombre_tema) {
            var notificacion = {
                notificacion: null,
                visto: false,
                id_ref: null
            }
            if (tema_votado) {
                // Notificacion a todos los del comite
                this.axios.get("todos_usuarios").then((respU) => {
                    const usuarios = respU.data
                    var comites = usuarios.filter(u => u.escomite == true)
                    for (var i = 0; comites.length; i++) {
                        if (tema_estado) {
                            notificacion.id_ref = comites[i]._id
                            notificacion.notificacion = "Se ha aprobo el tema " + nombre_tema
                            this.axios.post("nuevo_notificacion", notificacion)
                        } else {
                            notificacion.id_ref = comites[i]._id
                            notificacion.notificacion = "Se ha rechazo el tema " + nombre_tema
                            this.axios.post("nuevo_notificacion", notificacion)
                        }
                    }
                })
            } else {
                // Notificacion al comite usuario
                notificacion.id_ref = localStorage.getItem("key_user")
                notificacion.notificacion = "Has votado el tema " + nombre_tema
                this.axios.post("nuevo_notificacion", notificacion)
            }

        },
        cargar_temas() {
            this.axios.get("todos_temas")
                .then((response) => {
                    this.axios.get("todos_usuarios").then((resp) => {
                        this.temas_disponibles = 0
                        this.temas = response.data
                        const usuarios = resp.data
                        for (var i = 0; i < this.temas.length; i++) {
                            let creador = usuarios.filter(u => u._id === this.temas[i].idCreador)
                            this.temas[i].nombreCreador = creador[0].nombre
                            let votos = 0
                            for (var j = 0; j < this.temas[i].votos.length; j++) {
                                if (this.temas[i].votos[j].refcomite === localStorage.getItem("key_user")) {
                                    this.temas[i].voto_usuario_sesion = this.temas[i].votos[j].voto
                                }
                                if (this.temas[i].votos[j].voto !== null) {
                                    votos++
                                } else {
                                    this.temas_disponibles++
                                }
                                let comite = usuarios.filter(u => u._id === this.temas[i].votos[j].refcomite)
                                this.temas[i].votos[j].nombrecomite = comite[0].nombre
                                this.temas[i].votos[j].imgcomite = comite[0].img
                            }
                            if (votos == 3) {
                                this.temas[i].votado = true
                            } else {
                                this.temas[i].votado = false
                            }
                        }
                        this.cargando_temas = false
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        },

        confirmacion(id, voto) {
            Swal.fire({
                title: 'Estas Seguro?',
                text: "No se podrá revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.state.loading = true
                    var tema_voto = this.temas.filter(v => v._id == id)
                    var votos_totales = tema_voto[0].votos.length
                    var votos_hechos = 0
                    var voto_apruebo = 0
                    if (voto == "aceptar") {
                        for (var i = 0; i < tema_voto[0].votos.length; i++) {
                            if (tema_voto[0].votos[i].refcomite == localStorage.getItem("key_user")) {
                                tema_voto[0].votos[i].voto = true
                            }
                            if (tema_voto[0].votos[i].voto == true) {
                                votos_hechos++
                                voto_apruebo++
                            } else if (tema_voto[0].votos[i].voto == false) {
                                votos_hechos++
                            }
                        }
                    } else {
                        for (var i = 0; i < tema_voto[0].votos.length; i++) {
                            if (tema_voto[0].votos[i].refcomite == localStorage.getItem("key_user")) {
                                tema_voto[0].votos[i].voto = false
                            }
                            if (tema_voto[0].votos[i].voto == true) {
                                votos_hechos++
                                voto_apruebo++
                            } else if (tema_voto[0].votos[i].voto == false) {
                                votos_hechos++
                            }
                        }
                    }
                    if (votos_hechos == votos_totales) {
                        if (voto_apruebo > (votos_hechos / 2)) {
                            tema_voto[0].resultado_comite = true
                        } else {
                            tema_voto[0].resultado_comite = false
                        }
                        this.enviarNotificacion(true,tema_voto[0].resultado_comite,tema_voto[0].nombre)
                    }else{
                        this.enviarNotificacion(false,null,tema_voto[0].nombre)
                    }
                    tema_voto[0].fechacambio = Date.now()
                    this.axios.put(`/tema_ac/${id}`, tema_voto[0])
                        .then((response) => {
                            const index = this.temas.findIndex(v => v._id == tema_voto[0]._id);
                            this.temas[index].voto_usuario_sesion = true
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                    this.$store.commit('cargar_datos')

                }
            })
        },
        sortBy(prop) {
            this.solicitudes.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
        },
        verSolicitud(titulo, descripcion, estudiante, fecha) {
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