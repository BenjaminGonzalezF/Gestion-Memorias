<template>
    <div class="Solicitudes">

        <div class="one">
            <h1>Docentes: solicitudes de memoria</h1>
            </div>
       
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;
            top:20%;
            left: 50%;" v-if="solicitudes.length == 0">
            </v-progress-circular>
            <div>
                <v-container class="my-3">
                    <v-layout row class="mx-1">
                        <v-spacer></v-spacer>
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
                    <div v-for="(project, index) in solicitudes" :key="index">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2">

                            <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                <v-flex xs8 md3>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.title }}</div>
                                </v-flex>
                                <v-flex xs6 md5>
                                    <div class="caption grey--text">Descripcion general proyecto</div>
                                    <div>{{ project.descripcion }}</div>
                                </v-flex>
                                <v-flex xs2 sm1 md2>
                                    <div class="caption grey--text">Estudiante</div>
                                    <div>{{ project.estudiante }}</div>
                                </v-flex>
                                <v-flex xs2 sm3 md2>
                                    <!-- <div class="caption grey--text">Durum</div> -->
                                    <div class="my-1 text-center">
                                        <v-btn
                                            @click="verSolicitud(project.title, project.descripcion, project.estudiante, project.fecha, project.matricula, project.img)">
                                            Ver solicitud
                                        </v-btn>
                                    </div>
                                </v-flex>
                                
                            </v-layout>
                        </v-card>
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
                                                            <div class="caption black--text">Descripcion general proyecto:
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
                                            <v-card max-height="400" class ="justify-center">
                                                <v-card-title>
                                                    <span class="text-h5">Datos estudiante</span>
                                                </v-card-title>
                                                <v-card-text >
                                                    <v-container>
                                                        <v-flex>
                                                            <v-avatar size="140">
                                                                <v-img :src="imagenEstudiante">
                                                                <template v-slot:placeholder>
                                                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                                                    <v-progress-circular indeterminate color="white"></v-progress-circular>
                                                                    </v-row>
                                                                </template>
                                                                </v-img>
                                                            </v-avatar>
                                                        </v-flex>
                                                        <v-flex>
                                                            <div class="caption black--text">Nombre estudiante:</div>
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
                                        <v-btn color="#FF0182" @click="feedback()" dark> Aceptar o rechazar </v-btn>                
                                    </v-card-actions>                                    
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </div>

                </v-container>
                <v-dialog v-model="drawerFeedback" max-width="600">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Feedback solicitud</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-flex>
                                    <v-textarea counter="300">
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
                            <v-btn >
                                Aceptar solicitud
                            </v-btn>
                            <v-btn>
                                Rechazar solicitud
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-sheet>

    </div>
</template>
  
<script>

export default {
    
    name: 'Solicitudes',
    components: {
    },
    data() {
        return {
            drawer: null,
            drawerSolicitud: false,
            drawerFeedback: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            matricula: null,
            imagenEstudiante: null,
            fecha: null,
            toggle: null,
            solicitudes: [],
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'title' },
                {
                    title: 'Por estudiante',
                    prop: 'estudiante',
                },
            ],
        };
    },
    created(){
        this.cargar_solicitudes()
    },
    methods: {
        cargar_solicitudes() {
            this.axios.get("todos_solicitudes")
                .then((respS) => {
                    this.axios.get("todos_usuarios").then((respU) => {
                        this.axios.get("todos_temas").then((respT) => {
                            this.solicitudes = respS.data
                            const temas = respT.data
                            const usuarios = respU.data
                            const solicitud_profesor=[]
                            for (var i = 0; i < this.solicitudes.length; i++) {
                                let alumno = usuarios.filter(u => u._id == this.solicitudes[i].alumnoid)
                                let tema = temas.filter(t => t._id == this.solicitudes[i].temaid)
                                if(this.solicitudes[i].profeguiaid===localStorage.getItem("key_user")){
                                    solicitud_profesor.push({
                                        title:tema[0].nombre,
                                        descripcion:tema[0].descripcion,
                                        fecha:tema[0].fecha,
                                        estudiante:alumno[0].nombre,
                                        alumnoid:this.solicitudes[i].alumnoid,
                                        temaid:this.solicitudes[i].temaid,
                                        profeguiaid:this.solicitudes[i].profeguiaid,
                                        img:alumno[0].img,
                                        matricula:alumno[0].matricula
                                    })
                                }
                                this.solicitudes[i].title=tema[0].nombre
                                this.solicitudes[i].descripcion=tema[0].descripcion
                                this.solicitudes[i].fecha=tema[0].fecha
                                this.solicitudes[i].estudiante=alumno[0].nombre
                                this.solicitudes[i].matricula=alumno[0].matricula
                                this.solicitudes[i].img=alumno[0].img
                                
                            }
                            this.solicitudes=solicitud_profesor
                        })
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        sortBy(prop) {
            this.solicitudes.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
        },
        verSolicitud(titulo, descripcion, estudiante, fecha, matricula, imagen) {
            this.drawerSolicitud = true
            this.tituloProyecto = titulo
            this.descripcionProyecto = descripcion
            this.estudiante = estudiante
            this.fecha = fecha
            this.matricula = matricula
            this.imagenEstudiante = imagen
        },
        feedback(){
            this.drawerFeedback = true
            this.drawerSolicitud = false
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