<template>
    <div class="Solicitudes">
        <div class="one"> 
            <h1>Direccion de Escuela: Historial</h1> 
            </div>
        <v-layout row class="mx-1">
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-spacer></v-spacer>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed color="rgb(0, 204, 255)" class="mb-5" dark small v-bind="attrs" v-on="on">
                        Ordenar
                        <v-icon right small>mdi-sort</v-icon>
                    </v-btn>
                </template>   
            </v-menu>
        </v-layout>
        <v-card height="500" width="100%" outlined class="overflow-y-auto" >
        <v-container>
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;top:20%;left: 50%;"
                v-if="cargando_temas == true">
            </v-progress-circular>
            <div v-else>
                <v-container class="my-3">
                    <div v-for="project in temas" :key="project._id">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2"
                            v-if="project.resultado_comite == true">
                            <v-layout row wrap :class="`pa- project ${project.estadovalido}`">
                                <v-flex xs8 md3>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.nombre }}</div>
                                </v-flex>
                                <v-flex xs1 md2>
                                    <div class="caption grey--text">Creador</div>
                                    <div>{{ project.nombreCreador }}</div>
                                </v-flex>
                                <v-flex xs6 md3>
                                    <div class="caption grey--text">fecha</div>
                                    <div>{{ project.fechacambio }}</div>
                                </v-flex>
                                <v-flex xs5 md2>
                                    <div class="caption grey--text">Estado</div>
                                    <div v-if="project.resultado_comite">Aprobado</div>
                                    <div v-else>Rechazado</div>
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
        </v-sheet>
    </v-container>
    </v-card>
    </div>
</template>

<script>
import loading from '@/components/loading.vue';
export default {
    name: 'Solicitudes',
    components: {
        loading,
    },
    data() {
        return {
            drawer: null,
            toggle: false,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            fecha: null,
            toggle: null,
            temas: [],
            temasHistorial: [],
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
        cargar_temas() {
            this.axios.get("todos_temas")
                .then((response) => {
                    this.axios.get("todos_usuarios").then((resp) => {
                        this.temas = response.data
                        const usuarios = resp.data
                        for (var i = 0; i < this.temas.length; i++) {
                            let creador = usuarios.filter(u => u._id === this.temas[i].idCreador)
                            this.temas[i].nombreCreador = creador[0].nombre
                            for (var j = 0; j < this.temas[i].votos.length; j++) {
                                if (this.temas[i].votos[j].refcomite === localStorage.getItem("key_user")) {
                                    this.temas[i].voto_usuario_sesion = this.temas[i].votos[j].voto
                                }
                                let comite = usuarios.filter(u => u._id === this.temas[i].votos[j].refcomite)
                                this.temas[i].votos[j].nombrecomite = comite[0].nombre
                                this.temas[i].votos[j].imgcomite = comite[0].img
                            }
                            if (this.temas[i].resultado_comite != null) {
                                this.temasHistorial.push(this.temas[i])
                            }
                        }
                        this.cargando_temas = false
                    })
                })
                .catch((e) => {
                    console.log(e)
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