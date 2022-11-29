<template>
    <div class="Temas">
        <div class="one mb-7"> 
            <h1>Alumnos: Mis Temas</h1> 
            <notificacion></notificacion>
            </div>
        <v-layout row class="mx-1">
            <v-btn depressed color="#f5a42a" dark small
                @click="agregar_temas(false, nombre_temacrear1, descripcion_temacrear1, profesor_temacrear1)">
                Agregar tema
                <v-icon right small>mdi-note-plus</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <!-- Arreglar el ordenar Ojo********* -->
            <v-menu offset-y>
                <v-text-field class="pt-5" placeholder="Strawberries" outlined clearable></v-text-field>
                <v-btn dark x-large color="pink"> SEARCH </v-btn>
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
                <v-container class="my-3">
                    <v-progress-circular :size="50" color="primary" indeterminate
                        style="position: absolute;top:20%;left: 50%;" v-if="cargando_temas == true">
                    </v-progress-circular>
                    <div v-for="(project, index) in temas" :key="index">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2">
                            <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                <v-flex xs8 md3>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.nombre }}</div>
                                </v-flex>
                                <v-flex xs6 md6>
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
                </v-container>

                <!-- dialogo para agregar un tema -->
                <v-dialog v-model="crearTema" height="800" width="60%">
                    <v-card height="60%" width="100%">
                        <v-container>
                            <v-card-title class="justify-center">
                                <span class="text-h5">Crear tema</span>
                            </v-card-title>
                            <v-card-text color="#F4F4F4">
                                <v-text-field v-model="nombre_temacrear" label="Título del tema"
                                    :rules="[() => !!nombre_temacrear || 'Este campo no puede quedar vacio']"
                                    :error-messages="errorMessages" required></v-text-field>
                                <v-textarea auto-grow v-model="descripcion_temacrear" label="Descripcion del tema"
                                    max-height="50"
                                    :rules="[() => !!descripcion_temacrear || 'Este campo no puede quedar vacio']"
                                    :error-messages="errorMessages" required></v-textarea>
                                <v-select v-model="profesor_temacrear" label="Profesor guia" :items="profesores_guias"
                                    :item-value="profesores_guias.value"
                                    :rules="[() => profesor_temacrear != null || 'Se tiene que selecionar profesor guia']"
                                    :error-messages="errorMessages" required>
                                </v-select>
                                <v-col></v-col>
                                <v-spacer></v-spacer>
                                <v-row justify="space-around">
                                    <v-btn class="white--text mt-3" color="rgb(0, 204, 255)"
                                        @click="agregar_temas(true, nombre_temacrear, descripcion_temacrear, profesor_temacrear)"
                                        :disabled="((nombre_temacrear == null) || (descripcion_temacrear == null) || (profesor_temacrear == null))">
                                        Crear
                                    </v-btn>
                                </v-row>
                            </v-card-text>
                        </v-container>
                    </v-card>
                </v-dialog>
                <!-- dialogo para ver el estado del tema -->
                <v-dialog v-model="drawerEstado" max-width="500">
                    <v-card max-width="500">
                        <v-card-title>
                            Estado
                        </v-card-title>
                        <v-card-text>
                            <v-timeline>
                                <v-timeline-item icon="mdi-clock" color="#bdbdbd"
                                    v-if="solicitud_seleccionada.resultado_comite == null">
                                    <span slot="opposite">Comite </span>
                                    <span slot="opposite">Pendiente</span>
                                </v-timeline-item>
                                <v-timeline-item icon="mdi-checkbox-marked-circle" color="green"
                                    v-if="solicitud_seleccionada.resultado_comite == true">
                                    <span slot="opposite">Comite </span>
                                    <span slot="opposite">Aceptado</span>
                                </v-timeline-item>
                                <v-timeline-item icon="mdi-cancel" color="red"
                                    v-if="solicitud_seleccionada.resultado_comite == false">
                                    <span slot="opposite">Comite </span>
                                    <span slot="opposite">Rechazado</span>
                                </v-timeline-item>
                                <v-timeline-item icon="mdi-clock" color="#bdbdbd"
                                    v-if="solicitud_seleccionada.resultado_directora == null">
                                    <span slot="opposite">Director </span>
                                    <span slot="opposite">Pendiente</span>
                                </v-timeline-item>
                                <v-timeline-item icon="mdi-checkbox-marked-circle" color="green"
                                    v-if="solicitud_seleccionada.resultado_directora == true">
                                    <span slot="opposite">Director </span>
                                    <span slot="opposite">Aceptado</span>
                                </v-timeline-item>
                                <v-timeline-item icon="mdi-cancel" color="red"
                                    v-if="solicitud_seleccionada.resultado_directora == false">
                                    <span slot="opposite">Director </span>
                                    <span slot="opposite">Rechazado</span>
                                </v-timeline-item>
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
                                <v-timeline-item icon="mdi-cancel" color="red"
                                    v-if="solicitud_seleccionada.resultado_profesor == false">
                                    <span slot="opposite">Profesor </span>
                                    <span slot="opposite">Rechazado</span>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- dialogo para añadir un requisito -->
                <v-dialog v-model="crearRequisito" max-width="500">
                    <v-card>
                        <v-container>
                            <v-card-title class="justify-center">
                                <span class="text-h5">Crear requisito</span>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field v-model="requisito_anadir" label="Requisito"
                                    :rules="[() => !!requisito_anadir || 'Este campo no puede quedar vacio']"
                                    :error-messages="errorMessages" required>></v-text-field>
                                <v-btn class="white--text mt-3" color="rgb(0, 204, 255)"
                                    @click="agregar_requisitos_tema(false)" :disabled="requisito_anadir == null">Añadir
                                </v-btn>
                            </v-card-text>
                        </v-container>
                    </v-card>
                </v-dialog>
                <div class="text-center" v-if="cargando_temas == false && temas.length == 0">
                    <h1> No tienes Temas</h1>
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
</template>

<script>

import { Icon } from '@iconify/vue2';
import Swal from 'sweetalert2'
import notificacion from "@/components/notificacion.vue"

export default {
    name: "Temas",
    components: {
        Icon,
        Swal,
        notificacion
    },
    data() {
        return {
            nombre_temacrear1: "a",
            descripcion_temacrear1: "b",
            profesor_temacrear1: "c",
            crearTema: false,
            crearRequisito: false,
            cargando_temas: true,
            requisitos_temacrear: [],
            nombre_temacrear: null,
            profesor_temacrear: null,
            idprofesor_temacrear: null,
            profesores_guias: [],
            descripcion_temacrear: null,
            requisito_anadir: null,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            crearTema: false,
            cargando_temas: true,
            temas: [],
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'nombre' },
                {
                    title: 'Por descripcion',
                    prop: 'descripcion',
                },
            ],
            solicitud_seleccionada: {},
            drawerEstado: false,
            errorMessages: '',
        }
    },
    created() {
        this.cargar_temas_profe()
    },
    methods: {
        enviarNotificacion(){
            var notificacion={
                notificacion:null,
                visto:false,
                id_ref:null
            }
             // Notificacion al alumno
            notificacion.id_ref=localStorage.getItem("key_user")
            notificacion.notificacion="Has creado el tema "+this.nombre_temacrear
            this.axios.post("nuevo_notificacion",notificacion)
             // Notificacion a los del comite
            this.axios.get("todos_usuarios").then((respU)=>{
                const usuarios = respU.data
                var comites = usuarios.filter(u=> u.escomite==true)
                for(var i=0; comites.length;i++){
                    notificacion.id_ref=comites[i]._id
                    notificacion.notificacion="El usuario "+this.$store.state.nombre+" ha creado el tema "+this.nombre_temacrear
                    this.axios.post("nuevo_notificacion",notificacion)
                }
            })
        },
        cargar_temas_profe() {
            this.axios.get("todos_temas")
                .then((respT) => {
                    this.axios.get("todos_usuarios").then((respU) => {
                        var usuarios = respU.data
                        var profesores = usuarios.filter(u => u.esprofe == true)
                        for (var i = 0; i < profesores.length; i++) {
                            this.profesores_guias.push({
                                text: profesores[i].nombre,
                                value: profesores[i]._id
                            })
                        }
                        this.temas = respT.data
                        this.temas = this.temas.filter(T => T.idCreador == localStorage.getItem("key_user"))
                        this.cargando_temas = false
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        agregar_temas(crear_tema, titulo, descripcion, profesor) {
            console.log("t : " + titulo)
            console.log("d : " + descripcion)
            console.log("p : " + profesor)
            if (titulo == null || descripcion == null || profesor == null || titulo == "" || descripcion == "" || profesor == "") {
                console.log("error")
                // pantalla de error 
                if (titulo == null || titulo == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos incorrectos...',
                        text: 'Ingrese el titulo del tema',
                    })
                } else if (descripcion == null || descripcion == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos incorrectos...',
                        text: 'Ingrese la descripcion del tema!',
                    })
                } else if (profesor == null || profesor == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos incorrectos...',
                        text: 'Es necesario ingresar al profesor guia para continnuar!',
                    })
                }
            } else {
                console.log("t : " + titulo)
                console.log("d : " + descripcion)
                console.log("p : " + profesor)
                console.log("se crea")
                if (!crear_tema) {
                    this.crearTema = true
                } else {
                    var tema_crear = {
                        nombre: null,
                        idCreador: null,
                        colaborador: null,
                        estadoValido: null,
                        estadorefsolicitud: null,
                        fechacambio: null,
                        requisitos: [],
                        descripcion: null,
                        votos: [],
                        postulantes: [],
                        img: null,
                        resultado_comite: null,
                        resultado_directora: null,
                        resultado_profesor: null,
                    }
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
                            this.axios.get("todos_usuarios").then((resp) => {
                                const usuarios = resp.data
                                var comites = usuarios.filter(u => u.escomite == true)
                                for (var i = 0; i < comites.length; i++) {
                                    tema_crear.votos.push({
                                        refcomite: comites[i]._id,
                                        voto: null,
                                    })
                                }
                                var alumno = usuarios.find(u => u._id == localStorage.getItem("key_user"))
                                console.log(this.nombre_temacrear)
                                console.log(this.descripcion_temacrear)
                                console.log(this.requisitos_temacrear)
                                tema_crear.nombre = this.nombre_temacrear
                                tema_crear.descripcion = this.descripcion_temacrear
                                tema_crear.requisitos = this.requisitos_temacrear
                                tema_crear.idCreador = localStorage.getItem("key_user")
                                tema_crear.colaborador = this.profesor_temacrear
                                tema_crear.fechacambio = new Date().toLocaleDateString()
                                tema_crear.postulantes = {
                                    id: localStorage.getItem("key_user"),
                                    nombre: alumno.nombre,
                                    img: alumno.img,
                                    modulos_faltantes: alumno.modulosfaltantes,
                                    trabaja: alumno.trabaja,
                                    resultado_profesor_postulante: null,
                                    razon: null,
                                }
                                console.log(tema_crear)
                                this.axios.post("nuevo_tema", tema_crear).then((resp) => {
                                    this.nombre_temacrear = null
                                    this.descripcion_temacrear = null
                                    this.requisitos_temacrear = null
                                })
                            })
                            this.enviarNotificacion()
                            Swal.fire({
                                icon: 'success',
                                title: 'El Tema Agregado',
                                text: 'Se ha agregado tema correctamente!'
                            })
                            this.$store.commit('cargar_datos')
                            
                        }
                    })

                }
            }

        },
        agregar_requisitos_tema(consulta) {
            if (consulta) {
                this.crearRequisito = true
                this.crearTema = false
            } else {
                this.crearTema = true
                this.crearRequisito = false
                this.requisitos_temacrear.push(this.requisito_anadir)
                this.requisito_anadir = null
            }
        },
        eliminar_requisitos_tema(index) {
            var requisitos_nuevo = []
            for (var i = 0; i < this.requisitos_temacrear.length; i++) {
                if (i !== index) {
                    requisitos_nuevo.push(this.requisitos_temacrear[0])
                }
            }
            this.requisitos_temacrear = requisitos_nuevo
        },
        editar_requisitos_tema() {
            // Hay que hacer un dialogo nuevo, para que edite el requisito que ya agrego
        },
        sortBy(prop) {
            this.temas.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
        },

        verEstado(solicitud) {
            this.drawerEstado = true
            this.solicitud_seleccionada = solicitud
        },
        
    },


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