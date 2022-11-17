<template>
    
    <div class="Temas">
        <div>
                <v-container class="my-3">
                    <v-layout row class="mx-1">
                                <v-btn depressed color="rgb(0, 204, 255)" dark small @click="agregar_temas()">
                                    Agregar tema
                                    <v-icon right small>mdi-note-plus</v-icon>
                                </v-btn>
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
                <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;
            top:20%;
            left: 50%;" v-if="temas.length == 0">
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
                    <v-dialog v-model="crearTema" max-width="1000">
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
    </div>
</template>
<script>
export default {
    name: "Temas",
    components: {
    },
    data() {
        return {
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            crearTema: false,
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
                    this.temas = respT.data
                    this.temas = this.temas.filter(T => T.idCreador == localStorage.getItem("key_user"))

                })
                .catch((e) => {
                    console.log(e)
                })
        },
        agregar_temas() {
            this.crearTema = true

        },
        sortBy(prop) {
            this.temas.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
        },
    },

}

</script>