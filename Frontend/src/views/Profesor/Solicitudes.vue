<template>
    <div class="Solicitudes">
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
    
        <v-app-bar >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
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
                    <v-btn-toggle
                    v-model="toggle"
                    dense
                    class="mr-2"
                    style="max-height: 20px !important"
                    >
                    <v-btn small color="deep-purple lighten-2" :disabled="toggle === 0">
                        <v-icon class="white--text">mdi-view-agenda</v-icon>
                    </v-btn>

                    <v-btn small color="deep-purple lighten-2" :disabled="toggle === 1">
                        <v-icon class="white--text">mdi-view-grid</v-icon>
                    </v-btn>
                    </v-btn-toggle>
                    <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        depressed
                        color="deep-purple lighten-2"
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
                            <div class="caption grey--text">Estudiante</div>
                            <div>{{ project.estudiante }}</div>
                            </v-flex>

                            <v-flex xs6 sm4 md1>
                            <div class="caption grey--text">fecha</div>
                            <div>{{ project.fecha }}</div>
                            </v-flex>
                            <v-flex xs2 sm3 md2>
                            <!-- <div class="caption grey--text">Durum</div> -->
                            <div class="my-1 text-center">
                                <v-btn @click="verSolicitud(project.id, project.title, project.descripcion, project.estudiante, project.fecha)">
                                    Ver solicitud
                                </v-btn>
                            </div>
                            </v-flex>
                            <v-flex xs6 sm1 md1>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    fab
                                    text
                                    small
                                    color="red accent-2"
                                    class="mt-1"
                                    @click="deleteProject(project.id)"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                </template>
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
                                                <div class="caption grey--text">Descripcion general proyecto</div>
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

export default {
    name: 'Solicitudes',
    data() {
        return {
            drawer: null,
            drawerSolicitud : false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante : null,
            fecha : null,
            solicitudes:[{
                id: 1,
                title: 'proyecto 1',
                person: 'Manuel',
                descripcion:'EL proyecto 1 se tratara sobre blablabla',
                estudiante: 'Jose Gomez',
                fecha: '01/11/2022',
                status:'completado'
            },
            {
                id: 2,
                title: 'proyecto 2',
                person: 'Joselito',
                descripcion:'EL proyecto 2 se tratara sobre blablabla',
                estudiante: 'Joselito Rodriguez',
                fecha: '01/11/2022',
                status:'en progreso'
            },
            {
                id: 3,
                title: 'proyecto 3',
                person: 'Manuel Gonzalez',
                descripcion:'EL proyecto 3 se tratara sobre blablabla',
                estudiante: 'Pedro Bustamante',
                fecha: '01/11/2022',
                status:'atrasado'
            }
            ],
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
                { title: "Mis proyectos", icon: "mdi-folder" },
                { title: "Estudiantes", icon: "mdi-account-multiple" },
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