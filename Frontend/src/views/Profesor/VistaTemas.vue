<template>
    <div class="Temas">
        <div class="one mb-7"> 
            <h1>Docente: Mis Temas</h1> 
            <notificacion></notificacion>
            </div>
        <v-layout row class="mx-1">
            <v-btn depressed color="#f5a42a" dark small
                @click="agregar_temas(false, nombre_temacrear1, descripcion_temacrear1)">
                Agregar tema
                <v-icon right small>mdi-note-plus</v-icon>
            </v-btn>
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
                <div>
                    <v-container class="my-3">
                        <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;
                top:20%;
                left: 50%;" v-if="cargando_temas == true">
                        </v-progress-circular>
                        <div v-for="(project, index) in temas" :key="index">
                            <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2">
                                <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                    <v-flex xs8 md3>
                                        <div class="caption grey--text">Titulo proyecto</div>
                                        <div>{{ project.nombre }}</div>
                                    </v-flex>
                                    <v-flex xs6 md4>
                                        <div class="caption grey--text">Descripcion general proyecto</div>
                                        <div>{{ project.descripcion }}</div>
                                    </v-flex>
                                    <v-flex xs2 sm1 md2>
                                        <div class="caption grey--text">Requisitos</div>
                                        <div v-for="(requisitos, index) in project.requisitos" :key="index"> - {{
                                                requisitos
                                        }}
                                        </div>
                                    </v-flex>
                                    <v-flex xs2 sm1 md2>
                                        <div class="caption grey--text">Estado</div>
                                        <v-btn @click="verEstado(project)">ver estado</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </div>
                        <!-- dialogo para agregar un tema -->
                        <v-dialog v-model="crearTema" max-width="1000" width="80%">
                            <v-card height="60%" width="100%">
                                <v-container>
                                    <v-card-title class="justify-center">
                                        <span class="text-h5">Crear temas</span>
                                    </v-card-title>
                                    <v-card-text color="#F4F4F4">
                                        <v-text-field v-model="nombre_temacrear" label="Título del tema"
                                            :rules="[() => !!nombre_temacrear || 'Este campo no puede quedar vacio']"
                                            :error-messages="errorMessages" required>
                                        </v-text-field>
                                        <v-textarea auto-grow v-model="descripcion_temacrear"
                                            label="Descripcion del tema"
                                            :rules="[() => !!descripcion_temacrear || 'Este campo no puede quedar vacio']"
                                            :error-messages="errorMessages" required></v-textarea>
                                        <!-- verificar scroll-->
                                        <p>
                                            Requisitos:
                                        </p>
                                        <v-btn fab width="40" height="40" @click="agregar_requisitos_tema(true)">
                                            <Icon icon="carbon:add-filled" width="45" height="45"
                                                color="rgb(0, 204, 255)" />
                                        </v-btn>
                                        <v-card height="100" width="100%" outlined class="overflow-y-auto">
                                            <li v-for="(requisito, index) in requisitos_temacrear" :key="index">
                                                <label> {{ requisito }} </label>
                                                <!-- boton para editar un requisito -->
                                                <v-btn class="mx-1" fab width="30" height="30" color="#e5be01" outlined>
                                                    <Icon icon="dashicons:edit" color="black" width="15" height="15" />
                                                </v-btn>
                                                <!-- boton para eliminar un requisito -->
                                                <v-btn fab width="30" height="30" color="#cf142b" outlined
                                                    @click="eliminar_requisitos_tema(index)">
                                                    <Icon icon="ant-design:delete-twotone" color="black" width="15"
                                                        height="15" />
                                                </v-btn>
                                            </li>
                                        </v-card>
                                        <v-spacer></v-spacer>
                                        <v-row justify="space-around">
                                            <v-btn class="white--text mt-3" color="rgb(0, 204, 255)"
                                                @click="agregar_temas(true, nombre_temacrear, descripcion_temacrear)"
                                                :disabled="((nombre_temacrear == null) || (descripcion_temacrear == null))">
                                                Crear</v-btn>
                                        </v-row>
                                    </v-card-text>
                                </v-container>
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
                                            @click="agregar_requisitos_tema(false)"
                                            :disabled="requisito_anadir == null">
                                            Añadir</v-btn>
                                    </v-card-text>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-container>
                </div>
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
                                    <span slot="opposite">Aceptado</span>
                                    <span slot="opposite">Comite </span>
                                </v-timeline-item>
                                <v-timeline-item icon="mdi-cancel" color="red"
                                    v-if="solicitud_seleccionada.resultado_comite == false">
                                    <span slot="opposite">Comite </span>
                                </v-timeline-item>
                                <span slot="opposite">Rechazado</span>
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
                                    <span slot="opposite">Rechazado</span>
                                    <span slot="opposite">Director </span>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-card>
    </div>
</template>

<script>

import { Icon } from '@iconify/vue2';
import Swal from 'sweetalert2'
import notificacion from "@/components/notificacion.vue"
export default {
    components: {
        Icon,
        Swal,
        notificacion
    },
    data() {
        return {
            drawerEstado: false,
            solicitud_seleccionada: [],
            nombre_temacrear1: "a",
            descripcion_temacrear1: "b",
            profesor_temacrear1: "c",
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            crearTema: false,
            crearRequisito: false,
            cargando_temas: true,
            requisitos_temacrear: [],
            nombre_temacrear: null,
            descripcion_temacrear: null,
            temas: [],
            requisito_anadir: null,
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'nombre' },
                {
                    title: 'Por descripcion',
                    prop: 'descripcion',
                },
            ],
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
             // Notificacion al profesor
            notificacion.id_ref=localStorage.getItem("key_user")
            notificacion.notificacion="Has creado el tema "+this.nombre_temacrear
            this.axios.post("nuevo_notificacion",notificacion)
             // Notificacion a los del comite
            this.axios.get("todos_usuarios").then((respU)=>{
                const usuarios = respU.data
                var comites = usuarios.filter(u=> u.escomite==true)
                for(var i=0; comites.length;i++){
                    notificacion.id_ref=comites[i]._id
                    notificacion.notificacion="El profesor "+this.$store.state.nombre+" ha creado el tema "+this.nombre_temacrear
                    this.axios.post("nuevo_notificacion",notificacion)
                }
            })
        },
        cargar_temas_profe() {
            this.axios.get("todos_temas")
                .then((respT) => {
                    this.temas = respT.data
                    this.temas = this.temas.filter(T => T.idCreador == localStorage.getItem("key_user"))
                    this.cargando_temas = false
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        agregar_temas(crear_tema, titulo, descripcion) {
            console.log("t : " + titulo)
            console.log("d : " + descripcion)
            if (titulo == null || descripcion == null || titulo == "" || descripcion == "") {
                console.log("error")
                // pantalla de error 
                if (titulo == null || titulo == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos incorrectos...',
                        text: 'Ingrese el titulo del tem',
                    })
                } else if (descripcion == null || descripcion == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos incorrectos...',
                        text: 'Ingrese la descripcion del tema!',
                    })
                }
            } else {
                if (!crear_tema) {
                    this.crearTema = true
                } else {
                    console.log("t : " + titulo)
                    console.log("d : " + descripcion)
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
                                tema_crear.nombre = this.nombre_temacrear
                                tema_crear.descripcion = this.descripcion_temacrear
                                tema_crear.requisitos = this.requisitos_temacrear
                                tema_crear.idCreador = localStorage.getItem("key_user")
                                tema_crear.fechacambio = new Date().toLocaleDateString()
                                this.axios.post("nuevo_tema", tema_crear).then((resp) => {
                                    this.nombre_temacrear = null
                                    this.descripcion_temacrear = null
                                    this.requisitos_temacrear = null
                                   
                                })
                            })
                            this.enviarNotificacion()
                            this.$store.commit('cargar_datos')
                            Swal.fire({
                                icon: 'success',
                                title: 'El Tema Agregado',
                                text: 'Se ha agregado tema correctamente!',
                            })

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
        }
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