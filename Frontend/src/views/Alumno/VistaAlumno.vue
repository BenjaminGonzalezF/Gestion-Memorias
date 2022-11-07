<template>
      
    <div class="Oferta de temas">
       
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <v-app-bar  
            color="#00CCFF" 
        >    
            <v-img 
                max-height="40" 
                max-width="50" 
                src="@/assets/utal.png"   
            ></v-img> 
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
             
        </v-app-bar> 
        <v-navigation-drawer v-model="drawer" absolute temporary color="#00CCFF"> 
            <v-list-item> 
            <v-list-item-avatar> 
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img> 
            </v-list-item-avatar> 
             
            <v-list-item-content> 
                <v-list-item-title>John Leider</v-list-item-title> 
            </v-list-item-content> 
            </v-list-item> 
 
            <v-divider></v-divider> 
 
            <v-list dense> 
            <v-list-item v-for="item in items" :key="item.title" link> 
                <v-list-item-icon> 
                    <v-icon>{{ item.icon }}</v-icon> 
                </v-list-item-icon> 
 
                <v-list-item-content> 
                    <v-list-item-title>{{ item.title }}</v-list-item-title> 
                </v-list-item-content> 
            </v-list-item> 
            </v-list> 
        </v-navigation-drawer>    
      
       
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
                            <div class="caption grey--text">Profesor</div>
                            <div>{{ project.estudiante }}</div>
                            </v-flex>

                            <v-flex xs2 sm3 md2>
                            <!-- <div class="caption grey--text">Durum</div> -->
                            <div class="my-1 text-center">
                                <v-btn @click="verSolicitud(project.id, project.title, project.descripcion, project.estudiante, project.fecha)" >
                                    Ver descripcion tema
                                </v-btn>
                            </div>
                            </v-flex>
                            <v-flex xs6 sm1 md1>
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
                                                <div class="caption grey--text">Descripcion general proyecto</div>
                                                <div>{{ descripcionProyecto }}</div>
                                                </v-flex>
                                                <v-flex>
                                                <div class="caption grey--text">Profesor</div>
                                                <div>{{ estudiante }}</div>
                                                </v-flex>
                                            </v-container>
                                        </v-card-text>

                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                <v-card>
                                    <v-card-text>
                                        <v-container>
                                            <div class="my-1 text-center">
                                <v-btn @click="enviarSolicitud(project.id, project.title, project.descripcion, project.estudiante, project.fecha)" color="#f5a42a" >
                                    Enviar Solicitud
                                </v-btn>
                            </div>
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
import headerAlumno from '@/components/headerAlumno.vue';
 export default {
    name: 'Alumno',
    data() {
        return {
            drawer: null,
            drawerSolicitud : false,
            tituloProyecto: null,
            descripcionProyecto: null,
            profesor : null,
            solicitudes:[{
                id: 1,
                title: 'proyecto 1',
                person: 'Manuel',
                descripcion:'EL proyecto 1 se tratara sobre blablabla',
                profesor: 'Daniel Moreno',
                status:'completado'
            },
            {
                id: 2,
                title: 'proyecto 2',
                person: 'Joselito',
                descripcion:'EL proyecto 2 se tratara sobre blablabla',
                profesor: 'Rodrigo Paves',
                status:'en progreso'
            },
            {
                id: 3,
                title: 'proyecto 3',
                person: 'Manuel Gonzalez',
                descripcion:'EL proyecto 3 se tratara sobre blablabla',
                profesor: 'Luis Silvestre',
                status:'atrasado'
            }
            ],
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'title' },
                {
                title: 'Por profesor',
                prop: 'profesor',
                },
                {
                title: 'Por fecha',
                prop: 'fecha',
                },
            ],
            items: [
                { title: "Oferta temas", icon: "mdi-folder" },
                { title: "Solicitud de temas", icon: "mdi-folder" },
                { title: "Cerrar sesion", icon: "mdi-forum" },
            ],
        };
    },
    methods: {
    verSolicitud(id, titulo, descripcion, estudiante, fecha){
        this.drawerSolicitud = true
        this.tituloProyecto = titulo
        this.descripcionProyecto = descripcion
        this.estudiante = estudiante
    },
}
}
</script>

<style> 
    .v-list-item:hover { 
        background: #f5a42a; 
    } 
</style>
