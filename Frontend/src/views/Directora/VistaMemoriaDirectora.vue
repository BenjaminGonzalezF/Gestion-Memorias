<template>
    <div class="Solicitudes">
        
        <v-layout row class="mx-1">
            <div class="one"> 
            <h1>Direccion de Escuela: Solicitudes de Memorias</h1> 
            </div>
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
        <v-card height="500" width="100%" outlined class="overflow-y-auto" >
        <v-container>
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;" v-if="!this.$store.state.loading">
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;top:20%;left: 50%;"
                v-if="cargando_solicitudes && solicitudes_pendientes == 0">
            </v-progress-circular>
            <div>
                <v-container class="my-3">
                    <div v-for="(project, index) in solicitudes" :key="index">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2" v-if="project.estado == null">

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
                                    <div class="caption grey--text">Alumno</div>
                                    <div>{{ project.alumno }}</div>
                                </v-flex>

                                <v-flex xs6 sm4 md1>
                                    <div class="caption grey--text">Profesor guia</div>
                                    <div>{{ project.profeguia }}</div>
                                </v-flex>
                                <v-flex xs2 sm3 md2>
                                            <!-- <div class="caption grey--text">Durum</div> -->
                                            <div class="my-1 text-center">
                                                <v-btn
                                                    @click="verSolicitud(project.nombreTema, project.descripcionTema, project.estudiante_nombre, project.fechaTema, project.estudiante_matricula, project.estudiante_img)">
                                                    Ver solicitud
                                                </v-btn>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </div>
                            <v-dialog v-model="drawerSolicitud" max-width="700">
                                <v-card>
                                    <v-container class="grey lighten-5">
                                        <v-row>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-card max-height="400">
                                                    <v-card-title>
                                                        <span class="text-h5">Datos proyecto</span>
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-container>
                                                            <v-flex>
                                                                <div class="caption black--text">Titulo proyecto:</div>
                                                                <div>{{ project.nombre }}</div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text">Descripcion general
                                                                    proyecto:
                                                                </div>
                                                                <div>{{ project.descripcion }}</div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text">Estudiante:</div>
                                                                <div>{{project.alumno  }}</div>
                                                            </v-flex>
                                                        </v-container>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-card max-height="400" class="justify-center">
                                                    <v-card-title>
                                                        <span class="text-h5">Datos estudiante</span>
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-container>
                                                            <v-flex>
                                                                <v-avatar size="140">
                                                                    <v-img :src="imagenEstudiante">
                                                                        <template v-slot:placeholder>
                                                                            <v-row class="fill-height ma-0" align="center"
                                                                                justify="center">
                                                                                <v-progress-circular indeterminate
                                                                                    color="rgb(0, 204, 255)"></v-progress-circular>
                                                                            </v-row>
                                                                        </template>
                                                                    </v-img>
                                                                </v-avatar>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text">Nombre estudiante:</div>
                                                                <div>{{ estudiante }}</div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text">Matricula:
                                                                </div>
                                                                <div>{{ matricula }}</div>
                                                            </v-flex>
                                                        </v-container>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <v-card-actions class="justify-center">
                                            <v-btn color="#FF0182" dark @click="votar_tema(true,'')"> Aceptar</v-btn>
                                            <v-btn color="#FF0182" @click="feedback('')" dark> Rechazar </v-btn>
                                        </v-card-actions>
                                    </v-container>
                                </v-card>
                            </v-dialog>
                        </v-container>
                        <v-dialog v-model="drawerFeedback" max-width="600">
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">Feedback solicitud</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-flex>
                                            <v-textarea v-model="feedbacktext" counter="300">
                                                <template v-slot:label>
                                                    <div>
                                                        Deje sus comentarios
                                                    </div>
                                                </template>
                                            </v-textarea>
                                        </v-flex>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions class="justify-center">
                                    <v-btn @click="votar_tema(false,null)">
                                        Rechazar solicitud
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
            <div class="text-center" v-if="cargando_solicitudes == false && solicitudes_pendientes == 0">
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
import loading from "@/components/loading.vue"
export default {
    name: 'Solicitudes',
    data() {
        return {
            toggle: null,
            drawer: null,
            drawerSolicitud: false,
            drawerFeedback: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            fecha: null,
            feedbacktext: null,
            cargando_solicitudes: true,
            solicitud_seleccionado: null,
            solicitudes: [],
            solicitudes_pendientes: 0,
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
        };
    },
    components: {
        loading
    },
    created() {
        this.cargar_solicitudes()
    },
    methods: {
        cargar_solicitudes() {
            this.axios.get("todos_usuarios").then((respU) => {
                this.axios.get("todos_temas").then((respT) => {
                    this.axios.get("todos_solicitudes").then((respS) => {
                        this.solicitudes = respS.data
                        const temas = respT.data
                        const usuarios = respU.data
                        for (var i = 0; i < this.solicitudes.length; i++) {
                            if (this.solicitudes[i].estado == null) {
                                this.solicitudes_pendientes++
                            }
                            var profeguia = usuarios.filter(u => u._id == this.solicitudes[i].profeguiaid)
                            var temarel = temas.filter(t => t._id == this.solicitudes[i].temaid)
                            var alumno = usuarios.filter(u => u._id == this.solicitudes[i].alumnoid)
                            this.solicitudes[i].nombre = temarel[0].nombre
                            this.solicitudes[i].descripcion = temarel[0].descripcion
                            this.solicitudes[i].alumno = alumno[0].nombre
                            this.solicitudes[i].profeguia = profeguia[0].nombre

                        }
                        this.cargando_solicitudes = true
                    })
                }).catch((e) => {
                    console.log(e)
                })
            }).catch((e) => {
                console.log(e)
            })
        },
        votar_solicitud(voto, tema) {
            if (voto) {
                this.solicitud_seleccionado = tema
            } else {
                this.solicitud_seleccionado.razon = this.feedbacktext
            }
            this.solicitud_seleccionado.estado = voto
            this.axios.put(`solicitud_ac/${this.solicitud_seleccionado._id}`, this.solicitud_seleccionado)
            this.$store.state.loading = true
            this.$store.commit('cargar_datos')
        },
        feedback(solicitud) {
            this.solicitud_seleccionado = solicitud
            this.drawerFeedback = true
            this.drawerSolicitud = false
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