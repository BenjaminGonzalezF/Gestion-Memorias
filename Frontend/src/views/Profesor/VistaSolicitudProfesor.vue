<template>
    <div class="Solicitudes">
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
            <v-container>
                <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
                    <v-progress-circular :size="50" color="primary" indeterminate
                        style="position: absolute;top:20%;left: 50%;" v-if="cargando_temas == true">
                    </v-progress-circular>
                    <div>
                        <v-container class="my-3">
                            <div v-for="(project, index) in temas" :key="index">
                                <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2"
                                    v-if="project.resultado_comite && project.resultado_directora && project.resultado_profesor == null">
                                    <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                        <v-flex xs8 md3>
                                            <div class="caption grey--text">Titulo proyecto</div>
                                            <div>{{ project.nombreTema }}</div>
                                        </v-flex>
                                        <v-flex xs6 md5>
                                            <div class="caption grey--text">Descripcion general proyecto</div>
                                            <div>{{ project.descripcionTema }}</div>
                                        </v-flex>
                                        <v-flex xs2 sm1 md2>
                                            <div class="caption grey--text">Estudiante</div>
                                            <div>{{ project.estudiante_nombre }}</div>
                                        </v-flex>
                                        <v-flex xs2 sm3 md2>
                                            <!-- <div class="caption grey--text">Durum</div> -->
                                            <div class="my-1 text-center">
                                                <v-btn @click="verSolicitud(project)">
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
                                                                <div>{{ tituloProyecto }}</div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text">Descripcion general
                                                                    proyecto:
                                                                </div>
                                                                <div>{{ descripcionProyecto }}</div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text">Estudiante:</div>
                                                                <div>{{ estudiante }}</div>
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
                                                                            <v-row class="fill-height ma-0"
                                                                                align="center" justify="center">
                                                                                <v-progress-circular indeterminate
                                                                                    color="rgb(0, 204, 255)">
                                                                                </v-progress-circular>
                                                                            </v-row>
                                                                        </template>
                                                                    </v-img>
                                                                </v-avatar>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text">Nombre estudiante:
                                                                </div>
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
                                            <v-btn color="#FF0182" dark @click="votar_tema(true)"> Aceptar</v-btn>
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
                                    <v-btn @click="votar_tema(false)">
                                        Rechazar solicitud
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                    <div class="text-center" v-if="cargando_temas == false && temas_pendientes == 0">
                        <h1> No hay Solicitudes</h1>
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
export default {
    components: {
        Swal
    },
    data() {
        return {
            drawer: null,
            drawerSolicitud: false,
            drawerFeedback: false,
            feedbacktext: null,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            estudianteID: null,
            matricula: null,
            imagenEstudiante: null,
            fecha: null,
            toggle: null,
            temas: [],
            tema_seleccionado: null,
            temas_pendientes: 0,
            cargando_temas: true,
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'title' },
                {
                    title: 'Por estudiante',
                    prop: 'estudiante',
                },
            ],
        };
    },
    created() {
        this.cargar_temas()
    },
    methods: {
        cargar_temas() {
            this.axios.get("todos_temas").then((respT) => {
                this.axios.get("todos_usuarios").then((respU) => {
                    var solicitud_temas = []
                    this.temas = respT.data
                    const usuario = respU.data
                    for (var i = 0; i < this.temas.length; i++) {
                        if (this.temas[i].idCreador == localStorage.getItem("key_user") && this.temas[i].resultado_profesor == null) {
                            for (var j = 0; j < this.temas[i].postulantes.length; j++) {
                                if (this.temas[i].postulantes[j].resultado_profesor_postulante == null) {
                                    var postulante_alumno = usuario.find(u => u._id == this.temas[i].postulantes[j].id)
                                    this.temas[i].postulante_alumno = postulante_alumno
                                    solicitud_temas.push({
                                        tema_id: this.temas[i]._id,
                                        nombreTema: this.temas[i].nombre,
                                        descripcionTema: this.temas[i].descripcion,
                                        fechaTema: this.temas[i].fechacambio,
                                        estudiante_nombre: postulante_alumno.nombre,
                                        estudiante_img: postulante_alumno.img,
                                        estudiante_matricula: postulante_alumno.matricula,
                                        estudiante_id: postulante_alumno._id,
                                        resultado_comite: this.temas[i].resultado_comite,
                                        resultado_directora: this.temas[i].resultado_directora,
                                        resultado_profesor: this.temas[i].resultado_profesor,
                                    })
                                    this.temas_pendientes++
                                }
                            }
                        } else if (this.temas[i].colaborador == localStorage.getItem("key_user") && this.temas[i].resultado_profesor == null) {
                            if (this.temas[i].postulantes[0].resultado_profesor_postulante == null) {
                                var alumno = usuario.find(u => u._id == this.temas[i].idCreador)
                                this.temas[i].postulante_alumno = alumno
                                solicitud_temas.push({
                                    tema_id: this.temas[i]._id,
                                    nombreTema: this.temas[i].nombre,
                                    descripcionTema: this.temas[i].descripcion,
                                    fechaTema: this.temas[i].fechacambio,
                                    estudiante_nombre: alumno.nombre,
                                    estudiante_img: alumno.img,
                                    estudiante_matricula: alumno.matricula,
                                    estudiante_id: alumno._id,
                                    resultado_comite: this.temas[i].resultado_comite,
                                    resultado_directora: this.temas[i].resultado_directora,
                                    resultado_profesor: this.temas[i].resultado_profesor,
                                })
                                this.temas_pendientes++
                            }
                        }
                    }
                    this.temas = solicitud_temas
                    console.log(this.temas_pendientes)
                    this.cargando_temas = false
                })
            })
        },
        votar_tema(voto) {
            Swal.fire({
                title: 'Estas seguro?',
                text: "Esta decision no se podra revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (voto) {
                        this.axios.get("todos_temas").then((respT) => {
                            const temas = respT.data
                            var tema_cambiar = temas.find(t => t._id == this.tema_seleccionado)
                            tema_cambiar.resultado_profesor = voto
                            tema_cambiar.fechacambio = new Date().toLocaleDateString()
                            this.axios.put(`tema_ac/${tema_cambiar._id}`, tema_cambiar).then((resp) => {
                                if (tema_cambiar.resultado_comite && tema_cambiar.resultado_directora && tema_cambiar.resultado_profesor) {
                                    this.$store.state.loading = true
                                    var solicitud_crear = {
                                        profeguiaid: null,
                                        alumnoid: null,
                                        temaid: null,
                                        estado: null,
                                        razon: null,
                                    }
                                    solicitud_crear.profeguiaid = localStorage.getItem("key_user")
                                    solicitud_crear.alumnoid = this.estudianteID
                                    solicitud_crear.temaid = tema_cambiar._id
                                    console.log(solicitud_crear)
                                    this.axios.post("nuevo_solicitud", solicitud_crear)
                                    this.$store.commit('cargar_datos')
                                }
                            })
                        })
                    } else {
                        this.axios.get("todos_temas").then((respT) => {
                            const temas = respT.data
                            var tema_cambiar = temas.find(t => t._id == this.tema_seleccionado)
                            for (var i = 0; i < tema_cambiar.postulantes.length; i++) {
                                if (tema_cambiar.postulantes[i].id == this.estudianteID) {
                                    this.$store.state.loading = true
                                    tema_cambiar.postulantes[i].resultado_profesor_postulante = false
                                    tema_cambiar.postulantes[i].razon = this.feedbacktext
                                    this.axios.put(`tema_ac/${tema_cambiar._id}`, tema_cambiar)
                                    this.$store.commit('cargar_datos')
                                }
                            }
                        })
                    }
                    Swal.fire(
                        'Voto realizado!',
                        'Has votado correctamente.',
                        'success'
                    )
                }
            })

        },
        sortBy(prop) {
            this.temas.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
        },
        verSolicitud(tema) {
            console.log(tema.tema_id)
            this.drawerSolicitud = true
            this.tituloProyecto = tema.nombreTema
            this.descripcionProyecto = tema.descripcionTema
            this.estudiante = tema.estudiante_nombre
            this.estudianteID = tema.estudiante_id
            this.fecha = tema.fechaTema
            this.matricula = tema.estudiante_matricula
            this.imagenEstudiante = tema.estudiante_img
            this.tema_seleccionado = tema.tema_id
        },
        feedback(tema) {
            this.drawerFeedback = true
            this.drawerSolicitud = false
            console.log(this.tema_seleccionado)
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