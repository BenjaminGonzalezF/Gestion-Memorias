<template>
      <v-app>
    <div class="Oferta de temas">
        <div>
            <v-container class="my-3">
                <v-layout row class="mx-1">
                    <v-spacer></v-spacer>
                    <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        depressed
                        color="#f5a42a"
                        class="mb-5"
                        dark
                        small
                        v-bind="attrs"
                        v-on="on"
                        >
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
                <div v-for="project in temas" :key="project._id">
                     <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2">
                        
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
                            <div class="caption grey--text">Creador</div>
                            <div>{{ project.nombrecreador }}</div>
                            </v-flex>

                            <v-flex xs2 sm3 md2>
                            <!-- <div class="caption grey--text">Durum</div> -->
                            <div class="my-1 text-center">
                                <v-btn @click="verSolicitud(project._id, project.nombre, project.descripcion, project.idCreador, project.fecha)" >
                                    Ver descripcion tema
                                </v-btn>
                            </div>
                            </v-flex>
                            <v-flex xs6 sm1 md1>
                            </v-flex>
                        </v-layout>
                     </v-card>
                    <v-dialog v-model="drawerSolicitud" max-width="900">
                        <v-container class="grey lighten-5" >
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5">Datos proyecto</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-flex>
                                                <div class="caption grey--text">Proyecto:</div>
                                                <div>{{ tituloProyecto }}</div>
                                                </v-flex>
                                                <v-flex>
                                                <div class="caption grey--text">Descripción:</div>
                                                <div>{{ descripcionProyecto }}</div>
                                                </v-flex>
                                            </v-container>
                                        </v-card-text>

                                    </v-card>
                                    <v-btn @click="enviarSolicitud(project._id)" color="#f5a42a" >
                                        Enviar Solicitud
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>  
                    </v-dialog>
                </div>
            </v-container>
        </div>
    
    
    </div>
</v-app>
</template>

<script>
 export default {
    name: "Alumno",
    data() {
        return {
            drawer: null,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            profesor: null,
            estudiante: null,
            temas:[],   
            solicitudes:[{
                id: 1,
                title: 'proyecto 1',
                person: 'Manuel',
                descripcionGeneral:'EL proyecto 1 se tratara sobre blablabla',
                profesor: 'Daniel Moreno',
                status:'completado',
                descripcion:'Esto es una descripcion 1'
            },
            {
                id: 2,
                title: 'proyecto 2',
                person: 'Joselito',
                descripcionGeneral:'EL proyecto 2 se tratara sobre blablabla',
                profesor: 'Rodrigo Pavez',
                status:'en progreso',
                descripcion:'Esto es una descripcion 2'
            },
            {
                id: 3,
                title: 'proyecto 3',
                person: 'Manuel Gonzalez',
                descripcionGeneral:'EL proyecto 3 se tratara sobre blablabla',
                profesor: 'Luis Silvestre',
                status:'atrasado',
                descripcion:'Esto es una descripcion 3'
            }
            ],
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

        };
    },
    created() {
        this.cargar_temas()
    },
    methods: {
        cargar_temas(){
            this.axios.get("todos_temas")
                .then((respT) => {
                    this.axios.get("todos_usuarios").then((respU)=>{
                        const usuario = respU.data
                        this.temas=respT.data
                        for(var i=0; i<this.temas.length;i++){
                            const creador = usuario.filter(u => u._id==this.temas[i].idCreador)
                            this.temas[i].nombrecreador=creador[0].nombre
                        }
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        verSolicitud(id, titulo, descripcion, estudiante, fecha) {
            this.drawerSolicitud = true;
            this.tituloProyecto = titulo;
            this.descripcionProyecto = descripcion;
            this.estudiante = estudiante;
        },
        enviarSolicitud(id){
            if (this.$route.path == "/alumno") {
                this.$store.state.id_tema_solicitar=id
                console.log( this.$store.state.id_tema_solicitar)
                this.$router.push({ path: "/solicitudmemoria" })
            }
        }

       
    },
}
</script>

<style> 
    .v-list-item:hover { 
        background: #f5a42a; 
    } 
</style>
