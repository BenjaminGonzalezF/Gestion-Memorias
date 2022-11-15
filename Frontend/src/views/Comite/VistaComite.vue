<template>
    <div class="Solicitudes">
        <loading></loading>
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;"
            v-if="!this.$store.state.loading && this.$store.state.ingresoUsuario && this.$store.state.escomite">
            <headerComite></headerComite>
            <div>
                <v-container class="my-3">
                    <v-layout row class="mx-1">
                        <v-spacer></v-spacer>
                        <v-btn-toggle v-model="toggle" dense class="mr-2" style="max-height: 20px !important">
                            <v-btn small color="rgb(0, 204, 255)" :disabled="toggle === 0">
                                <v-icon class="white--text">mdi-view-agenda</v-icon>
                            </v-btn>

                            <v-btn small color="rgb(0, 204, 255)" :disabled="toggle === 1">
                                <v-icon class="white--text">mdi-view-grid</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn depressed color="rgb(0, 204, 255)" class="mb-5" dark small v-bind="attrs"
                                    v-on="on">
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
                    <div v-for="(project) in temas" :key="project._id">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2">
                            <v-layout row wrap :class="`pa- project ${project.estadovalido}`">
                                <v-flex xs8 md2>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.nombre }}</div>
                                </v-flex>

                                <v-flex xs2 sm1 md2>
                                    <div class="caption grey--text">Creador</div>
                                    <div>{{ project.idCreador }}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md1>
                                    <div class="caption grey--text">fecha</div>
                                    <div>{{ project.fechacambio }}</div>
                                </v-flex>
                                <v-flex xs2 sm3 md2>
                                    <!-- <div class="caption grey--text">Durum</div> -->
                                    <div class="my-1 text-center">
                                        <v-btn
                                            @click="verSolicitud(project._id, project.nombre, project.descripcion, project.idCreador, project.fechacambio)">
                                            Ver más
                                        </v-btn>
                                    </div>
                                </v-flex>
                                <v-flex xs6 sm1 md1>
                                    <v-btn fab text small color="green accent-2" class="mt-1"
                                        @click="confirmacion(project._id, 'aceptar')">
                                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                                        <!-- @click="aceptarProyecto(project.id)" -->
                                    </v-btn>
                                </v-flex>
                                <v-btn fab text small color="red accent-2" class="mt-1"
                                    @click="confirmacion(project._id, 'denegar')">
                                    <v-icon>mdi-cancel</v-icon>
                                    <!-- @click="deleteProject(project.id)" -->
                                </v-btn>
                                <v-flex xs6 sm1 md1>
                                </v-flex>
                                <v-flex xs2 sm1 md2>
                                    <div class="caption grey--text">Votos</div>
                                    <v-tooltip bottom v-for="voto in project.votos" :key="voto.refcomite">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-avatar size="30" v-bind="attrs" v-on="on">
                                                <img src="@/assets/rey.jpg" v-if="voto.voto !== null" />
                                            </v-avatar>
                                        </template>
                                        <span>Tooltip</span>
                                    </v-tooltip>
                                </v-flex>
                            </v-layout>
                        </v-card>
                        <v-dialog v-model="drawerSolicitud" max-width="900">
                            <v-container class="grey lighten-5">
                                <v-row>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Datos proyecto</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-flex>
                                                        <div class="caption grey--text">Titulo proyecto</div>
                                                        <div>{{ tituloProyecto }}</div>
                                                    </v-flex>
                                                    <v-flex>
                                                        <div class="caption grey--text">Descripcion general proyecto
                                                        </div>
                                                        <div>{{ descripcionProyecto }}</div>
                                                    </v-flex>
                                                    <v-flex>
                                                        <div class="caption grey--text">Estudiante</div>
                                                        <div>{{ estudiante }}</div>
                                                    </v-flex>

                                                    <v-flex>
                                                        <div class="caption grey--text">fecha</div>
                                                        <div>{{ fecha }}</div>
                                                    </v-flex>
                                                </v-container>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Datos estudiante</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                </v-container>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-dialog>
                    </div>
                </v-container>
            </div>
        </v-sheet>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2'
import headerComite from '@/components/headerComite.vue';
import loading from '@/components/loading.vue';
export default {
    name: 'Solicitudes',
    components: {
        headerComite,
        loading,
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
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'title' },
                {
                    title: 'Por estudiante',
                    prop: 'estudiante',
                },
                {
                    title: 'Por fecha',
                    prop: 'fecha',
                },
            ],
            items: [
                { title: "Mis solicitudes", icon: "mdi-folder" },
                { title: "Mis proyectos", icon: "mdi-folder" },
                { title: "Estudiantes", icon: "mdi-account-multiple" },
                { title: "Cerrar sesion", icon: "mdi-forum" },
            ],
        };
    },
    destroyed() {
        console.log("Login eliminado");
    },
    beforeCreate() {
        this.$store.state.loading = true
        this.$store.commit('cargar_datos')
    },
    created() {
        this.cargar_temas()
    },
    methods: {
        cargar_temas() {
            this.axios.get("todos_temas")
                .then((response) => {
                    this.temas = response.data
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
                    Swal.fire(
                        'Confirmado!',
                        '',
                        'success'
                    )
                    var tema_voto = this.temas.filter(v => v._id==id)
                    if(voto=="aceptar"){
                        for(var i =0; i<tema_voto[0].votos.length; i++){
                            if(tema_voto[0].votos[i].refcomite==localStorage.getItem("key_user")){
                                tema_voto[0].votos[i].voto = true
                            }
                        }
                    }else{
                        for(var i =0; i<tema_voto[0].votos.length; i++){
                            if(tema_voto[0].votos[i].refcomite==localStorage.getItem("key_user")){
                                tema_voto[0].votos[i].voto = false
                            }
                        }
                    }
                    this.axios.put(`/tema_ac/${id}`,tema_voto[0])
                        .then((response) => {
                            const index = this.temas.findIndex(v => v._id == tema_voto[0]._id);
                            this.temas[index]._id = tema_voto[0]._id
                            this.temas[index].nombre = tema_voto[0].nombre
                            this.temas[index].idCreador = tema_voto[0].idCreador
                            this.temas[index].estadorefsolicitud = tema_voto[0].estadorefsolicitud
                            this.temas[index].fechacambio = tema_voto[0].fechacambio
                            this.temas[index].requisitos = tema_voto[0].requisitos
                            this.temas[index].descripcion = tema_voto[0].descripcion
                            this.temas[index].img = tema_voto[0].img
                            this.temas[index].votos = tema_voto[0].votos
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                }
            })
        },
        sortBy(prop) {
            this.solicitudes.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
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
    }
}
</script>

<style>
.v-list-item:hover {
    background: #f5a42a;
}
</style>