<template>
    <div class="Solicitudes">
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;top:20%;left: 50%;"
                v-if="cargando_temas == true">
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
                    <div v-for="(project, index) in temas" :key="index">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2"
                            v-if="project.resultado_comite && project.resultado_directora && project.resultado_profesor==null">

                            <v-layout row wrap :class="`pa-3 project ${project.status}`">
                                <v-flex xs8 md3>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.nombre }}</div>
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
                                            @click="verSolicitud(project.nombre, project.descripcion, project.estudiante, project.fecha, project.matricula, project.img)">
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
                                                                        <v-row class="fill-height ma-0" align="center"
                                                                            justify="center">
                                                                            <v-progress-circular indeterminate
                                                                                color="rgb(0, 204, 255)"></v-progress-circular>
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
                                        <v-btn color="#FF0182" dark @click="votar_tema(true,project)"> Aceptar</v-btn>
                                        <v-btn color="#FF0182" @click="feedback(project)" dark> Rechazar </v-btn>
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
                            <v-btn @click="votar_tema(false,null)">
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
    </div>
</template>
  
<script>

export default {

    components: {
    },
    data() {
        return {
            drawer: null,
            drawerSolicitud: false,
            drawerFeedback: false,
            feedbacktext:null,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            matricula: null,
            imagenEstudiante: null,
            fecha: null,
            toggle: null,
            temas: [],
            tema_seleccionado:null,
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
                    this.axios.get("todos_usuarios").then((respU)=>{
                        this.temas = respT.data
                        const usuario = respU.data
                        this.temas = this.temas.filter(t=>t.colaborador==localStorage.getItem("key_user"))
                        for(var i=0; i<this.temas.length;i++){
                            var creador = usuario.filter(u=>u._id == this.temas[i].idCreador)
                            this.temas[i].img=creador[0].img
                            this.temas[i].estudiante=creador[0].nombre
                            this.temas[i].matricula=creador[0].matricula
                            if(this.temas[i].resultado_comite && this.temas[i].resultado_directora && this.temas[i].resultado_profesor==null){
                                this.temas_pendientes++;
                            }
                        }
                        this.cargando_temas = false
                    })
                })
        },
        votar_tema(voto,tema){
            if(voto){
                this.tema_seleccionado=tema
                // Se agrega la razon xdxdd
                console.log(this.feedbacktext)
            }
            this.tema_seleccionado.resultado_profesor=voto
            this.axios.put(`tema_ac/${this.tema_seleccionado._id}`, this.tema_seleccionado).then((resp)=>{
                if(this.tema_seleccionado.resultado_comite && this.tema_seleccionado.resultado_directora && this.tema_seleccionado.resultado_profesor){
                    this.axios.get("todos_usuarios").then((respU)=>{
                        var solicitud_crear={
                            profeguiaid:null,
                            alumnoid:null,
                            temaid:null,
                            estado:null,
                            razon:null,
                        }
                        solicitud_crear.razon=this.feedbacktext
                        solicitud_crear.temaid=this.tema_seleccionado._id
                        const usuarios = respU.data
                        var creador = usuarios.filter(u=> u._id==this.tema_seleccionado.idCreador)
                        var colaborador = usuarios.filter(u=> u._id == this.tema_seleccionado.colaborador)
                        if(creador[0].esprofe){
                            solicitud_crear.profeguiaid=creador[0]._id
                            solicitud_crear.alumnoid=colaborador[0]._id
                        }else{
                            solicitud_crear.profeguiaid=colaborador[0]._id
                            solicitud_crear.alumnoid=creador[0]._id
                        }
                        this.axios.post("nuevo_solicitud",solicitud_crear)
                    })
                }
            })
            this.$store.state.loading=true
            this.$store.commit('cargar_datos')
        },
        sortBy(prop) {
            this.temas.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
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
        feedback(tema) {
            this.tema_seleccionado=tema
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
</style>