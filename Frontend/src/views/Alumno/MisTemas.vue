<template>

    <div class="Temas">
        <div>
            <v-container class="my-3">
                <v-layout row class="mx-1">
                    <v-btn depressed color="rgb(0, 204, 255)" dark small @click="agregar_temas(false)">
                        Agregar tema
                        <v-icon right small>mdi-note-plus</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-menu offset-y>
                        <v-text-field class="pt-5" placeholder="Strawberries" outlined clearable></v-text-field>
                        <v-btn dark x-large color="pink"> SEARCH </v-btn>
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
                                <div class="caption grey--text">Requisitos</div>
                                <div v-for="(requisitos, index) in project.requisitos" :key="index"> - {{ requisitos }}
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </div>
                <v-dialog v-model="crearTema" max-width="600">
                    <v-card>
                        <v-container class="grey lighten-5">
                            <v-card-title class="justify-center">
                                <span class="text-h5">Crear temas</span>
                            </v-card-title>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-container>
        </div>
        <!-- dialogo para agregar un tema -->
        <v-dialog v-model="crearTema" max-width="600">
            <v-card>
                <v-container>
                    <v-card-title class="justify-center">
                        <span class="text-h5">Crear temas</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="nombre_temacrear" label="Nombre del tema"></v-text-field>
                        <v-textarea auto-grow v-model="descripcion_temacrear" label="Descripcion del tema"></v-textarea>
                        <v-select v-model="profesor_temacrear" label="Profesor guia" :items="profesores_guias"
                            :item-value="profesores_guias.value"></v-select>
                        <p>
                            Requisitos:
                        </p>
                        <li v-for="(requisito, index) in requisitos_temacrear" :key="index">
                            <label> {{ requisito }} </label>
                            <!-- boton para editar un requisito -->
                            <v-btn class="mx-1" fab width="30" height="30" color="#e5be01" outlined>
                                <Icon icon="dashicons:edit" color="black" width="15" height="15" />
                            </v-btn>
                            <!-- boton para eliminar un requisito -->
                            <v-btn fab width="30" height="30" color="#cf142b" outlined
                                @click="eliminar_requisitos_tema(index)">
                                <Icon icon="ant-design:delete-twotone" color="black" width="15" height="15" />
                            </v-btn>
                        </li>
                        <v-btn fab width="40" height="40" @click="agregar_requisitos_tema(true)">
                            <Icon icon="carbon:add-filled" width="45" height="45" color="rgb(0, 204, 255)" />
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="white--text mt-3" color="rgb(0, 204, 255)" @click="agregar_temas(true)">
                            Crear</v-btn>
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
                        <v-text-field v-model="requisito_anadir" label="Requisito"></v-text-field>
                        <v-btn class="white--text mt-3" color="rgb(0, 204, 255)"
                            @click="agregar_requisitos_tema(false)">Añadir</v-btn>
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
    </div>
</template>
<script>
import { Icon } from '@iconify/vue2';
import Swal from 'sweetalert2'
export default {
    name: "Temas",
    components: {
        Icon,
        Swal
    },
    data() {
        return {
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
        }
    },
    created() {
        this.cargar_temas_profe()
    },
    methods: {
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
        agregar_temas(crear_tema) {
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
                    img: null,
                    resultado_comite: null,
                    resultado_directora: null,
                    resultado_profesor: null,
                }
                this.axios.get("todos_usuarios").then((resp) => {
                    const usuarios = resp.data
                    var comites = usuarios.filter(u => u.escomite == true)
                    for (var i = 0; i < comites.length; i++) {
                        tema_crear.votos.push({
                            refcomite: comites[i]._id,
                            voto: null
                        })
                    }
                    console.log(this.nombre_temacrear)
                    console.log(this.descripcion_temacrear)
                    console.log(this.requisitos_temacrear)
                    tema_crear.nombre = this.nombre_temacrear
                    tema_crear.descripcion = this.descripcion_temacrear
                    tema_crear.requisitos = this.requisitos_temacrear
                    tema_crear.idCreador = localStorage.getItem("key_user")
                    tema_crear.colaborador = this.profesor_temacrear
                    tema_crear.fechacambio = Date.now()
                    console.log(tema_crear)
                    this.axios.post("nuevo_tema", tema_crear).then((resp) => {
                        this.nombre_temacrear = null
                        this.descripcion_temacrear = null
                        this.requisitos_temacrear = null
                        this.$store.state.loading = true
                        this.$store.commit('cargar_datos')
                    })
                })
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
    },

}

</script>