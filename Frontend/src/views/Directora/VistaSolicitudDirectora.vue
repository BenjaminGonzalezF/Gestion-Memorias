<template>
    <div class="Solicitudes">
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;"
            v-if="!this.$store.state.loading && this.$store.state.ingresoUsuario && this.$store.state.esdirector">
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;
            top:20%;
            left: 50%;" v-if="solicitudes.length == 0">
            </v-progress-circular>
            <div>
                <v-container class="my-3">
                    <v-layout row class="mx-1">
                        <v-spacer></v-spacer>
                        <v-btn-toggle v-model="toggle" dense class="mr-2" style="max-height: 20px !important">
                            <v-btn small color=#f5a42a :disabled="toggle === 0">
                                <v-icon class="white--text">mdi-view-agenda</v-icon>
                            </v-btn>

                            <v-btn small color=#f5a42a :disabled="toggle === 1">
                                <v-icon class="white--text">mdi-view-grid</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn depressed color=#f5a42a class="mb-5" dark small v-bind="attrs" v-on="on">
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
                    <div v-for="(project, index) in solicitudes" :key="index">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2">

                            <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                <v-flex xs8 md2>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.title }}</div>
                                </v-flex>
                                <v-flex xs6 md3>
                                    <div class="caption grey--text">Descripcion general proyecto</div>
                                    <div>{{ project.descripcion }}</div>
                                </v-flex>
                                <v-flex xs2 sm1 md2>
                                    <div class="caption grey--text">Estudiante</div>
                                    <div>{{ project.estudiante }}</div>
                                </v-flex>

                                <v-flex xs6 sm4 md1>
                                    <div class="caption grey--text">fecha</div>
                                    <div>{{ project.fecha }}</div>
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
                                                        <v-btn color="green darken-1">aceptar</v-btn>
                                                        <v-btn color="red lighten-2">rechazar</v-btn>
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
        </v-sheet>

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
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            fecha: null,
            solicitudes: [],
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
            this.axios.get("todos_solicitudes").then((respS) => {
                this.axios.get("todos_usuarios").then((respU) => {
                    this.axios.get("todos_temas").then((respT) => {
                        this.solicitudes = respS.data
                        const usuarios = respU.data
                        const temas = respT.data
                        for (var i = 0; i < this.solicitudes.length; i++) {
                            var alumnoid = this.solicitudes[i].alumnoid
                            var temaid = this.solicitudes[i].temaid
                            var profesorguiaid = this.solicitudes[i].profeguiaid

                            let datos_alumno = usuarios.filter(u => u._id == alumnoid)
                            let datos_profesor = usuarios.filter(u => u._id == profesorguiaid)
                            let datos_tema = temas.filter(u => u._id == temaid)

                            this.solicitudes[i].title = datos_tema[0].nombre
                            this.solicitudes[i].descripcion = datos_tema[0].descripcion
                            this.solicitudes[i].fecha = datos_tema[0].fecha
                            this.solicitudes[i].estudiante = datos_alumno[0].nombre
                            this.solicitudes[i].profesor = datos_profesor[0].nombre
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
                }).catch((e) => {
                    console.log(e)
                })
            }).catch((e) => {
                console.log(e)
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
        }
    }


}

</script>

<style>
.v-list-item:hover {
    background: #f5a42a;
}
</style>