<template>
    <v-app>
        <div class="Oferta de temas">
            <div class="one">
                <h1>Alumnos: Mis Solicitudes</h1>
                <notificacion></notificacion>
            </div>
            <v-layout row class="mx-6">
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
                    <div v-for="(project, index) in missolicitudestemas" :key="index">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2"
                            v-if="project.resultado_comite == true && project.resultado_directora == true && (project.colaborador == null || project.colaborador == id_user)">
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
                                    <div class="caption grey--text">Estado</div>
                                    <v-btn @click="verEstado(project)">ver estado</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </div>
                    <!-- dialogo para ver el estado del tema -->
                    <v-dialog v-model="drawerEstado" max-width="500">
                        <v-card max-width="500">
                            <v-card-title>
                                Estado
                            </v-card-title>
                            <v-card-text>
                                <v-timeline>
                                    <v-timeline-item icon="mdi-clock" color="#bdbdbd"
                                        v-if="solicitud_seleccionada.resultado_profesor == null">
                                        <span slot="opposite">Profesor </span>
                                        <span slot="opposite">Pendiente</span>
                                    </v-timeline-item>
                                    <v-timeline-item icon="mdi-checkbox-marked-circle" color="green"
                                        v-if="solicitud_seleccionada.resultado_profesor == true">
                                        <span slot="opposite">Profesor </span>
                                        <span slot="opposite">Aceptado</span>
                                    </v-timeline-item>
                                    <v-timeline-item icon="mdi-cancel" color="#red"
                                        v-if="solicitud_seleccionada.resultado_profesor == false">
                                        <span slot="opposite">Profesor </span>
                                        <span slot="opposite">Rechazado</span>
                                    </v-timeline-item>
                                    <v-timeline-item icon="mdi-clock" color="#bdbdbd"
                                        v-if="solicitud_seleccionada.estado_soli_directora == null">
                                        <span slot="opposite">Director </span>
                                        <span slot="opposite">Pendiente</span>
                                    </v-timeline-item>
                                    <v-timeline-item icon="mdi-checkbox-marked-circle" color="green"
                                        v-if="solicitud_seleccionada.estado_soli_directora == true">
                                        <span slot="opposite">Director </span>
                                        <span slot="opposite">Aceptado</span>
                                    </v-timeline-item>
                                    <v-timeline-item icon="mdi-cancel" color="red"
                                        v-if="solicitud_seleccionada.estado_soli_directora == false">
                                        <span slot="opposite">Director </span>
                                        <span slot="opposite">Rechazado</span>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <div class="text-center" v-if="cargando_temas == false && mis_solicitudes == 0">
                        <h1> No has realizado ninguna solicitud</h1>
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
import { Icon } from '@iconify/vue2';
import notificacion from "@/components/notificacion.vue"
export default {
    name: "Alumno",
    data() {
        return {
            drawer: null,
            drawerEstado:false,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            profesor: null,
            estudiante: null,
            cargando_temas: true,
            tema_seleccionado: [],
            missolicitudestemas: [],
            mis_solicitudes: 0,
            solicitud_seleccionada:{},
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
            id_user:null,

        };
    },
    components: {
        Icon,
        notificacion
    },
    created() {
        this.cargar_missolicitudestemas()
    },
    methods: {
        cargar_missolicitudestemas() {
            this.id_user=localStorage.getItem("key_user")
            this.axios.get("todos_temas")
                .then((respT) => {
                    var MisSolicitudes = []
                    this.missolicitudestemas = respT.data
                    for (var i = 0; i < this.missolicitudestemas.length; i++) {
                        for (var j = 0; j < this.missolicitudestemas[i].postulantes.length; j++) {
                            if (this.missolicitudestemas[i].postulantes[j].id == localStorage.getItem("key_user")) {
                                this.missolicitudestemas[i].resultado_profesor_postulante = this.missolicitudestemas[i].postulantes[j].resultado_profesor_postulante
                                this.missolicitudestemas[i].razon_profesor = this.missolicitudestemas[i].postulantes[j].razon
                                if(this.missolicitudestemas[i].colaborador==null){
                                    this.mis_solicitudes++
                                }
                                MisSolicitudes.push(this.missolicitudestemas[i])
                            }
                        }
                    }
                    this.missolicitudestemas = MisSolicitudes
                    this.cargando_temas = false
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
            this.$store.state.id_tema_solicitar = id
            this.$store.state.vistaSeleccionada = 3
        },
        verEstado(solicitud_tema) {
            this.drawerEstado = true
            this.axios.get("todos_solicitudes").then((respS)=>{
                const solicitudes = respS.data
                var solicitud_sel = solicitudes.find(s=> s.temaid == solicitud_tema._id)
                solicitud_tema.estado_soli_directora=solicitud_sel.estado
                this.solicitud_seleccionada = solicitud_tema
            })
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
