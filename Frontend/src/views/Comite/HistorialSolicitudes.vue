<template>
    <div class="Solicitudes">
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;top:20%;left: 50%;" v-if="cargando_temas == true">
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
                    <div v-for="project in temas" :key="project._id">
                        <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2" v-if="project.resultado_comite!=null">
                            <v-layout row wrap :class="`pa- project ${project.estadovalido}`">
                                <v-flex xs8 md2>
                                    <div class="caption grey--text">Titulo proyecto</div>
                                    <div>{{ project.nombre }}</div>
                                </v-flex>
                                <v-flex xs2 sm1 md2>
                                    <div class="caption grey--text">Creador</div>
                                    <div>{{ project.nombreCreador }}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md1>
                                    <div class="caption grey--text">fecha</div>
                                    <div>{{ project.fechacambio }}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md1>
                                    <div class="caption grey--text">Estado</div>
                                    <div v-if="project.resultado_comite">Aprobado</div>
                                    <div v-else>Rechazado</div>
                                </v-flex>
                                <v-flex xs2 sm3 md2>
                                    <!-- <div class="caption grey--text">Durum</div> -->
                                    <div class="my-1 text-center">
                                        <v-btn
                                            @click="verSolicitud(project.nombre, project.descripcion, project.nombreCreador, project.fechacambio)">
                                            Ver más
                                        </v-btn>
                                    </div>
                                </v-flex>
                                <v-flex xs2 sm1 md2>
                                    <div class="caption grey--text">Votos</div>
                                    <v-tooltip bottom v-for="(voto , index) in project.votos" :key="index" >
                                        <template v-slot:activator="{ on, attrs }" v-if="voto.voto!==null">
                                            <v-avatar size="30" v-bind="attrs" v-on="on">
                                                <img :src="voto.imgcomite" v-if="voto.voto !== null" />
                                            </v-avatar>
                                        </template>
                                        <span v-if="voto.voto===true">{{voto.nombrecomite}} = Aceptado</span>
                                        <span v-if="voto.voto===false">{{voto.nombrecomite}} = Rechazado</span>
                                        
                                    </v-tooltip>
                                    <v-btn class="ml-6 white--text" color ="#FF0182" @click="exportPDF(project.nombre,project.nombreCreador)">PDF</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card>
                        <v-dialog v-model="drawerSolicitud" max-width="900">
                            <v-container class="grey lighten-5">                         
                                        <v-card>
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
                                                        <div class="caption black--text">Creador:</div>
                                                        <div>{{ estudiante }}</div>
                                                    </v-flex>

                                                    <v-flex>
                                                        <div class="caption black--text">fecha:</div>
                                                        <div>{{ fecha }}</div>
                                                    </v-flex>
                                                </v-container>
                                            </v-card-text>
                                        </v-card>
                            </v-container>
                        </v-dialog>
                    </div>
                </v-container>
            </div>
            <div class="text-center" v-if="cargando_temas == false && temas.length == 0">
                <h1> No tienes temas en el Historial</h1>
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
import Swal from 'sweetalert2'
import loading from '@/components/loading.vue';
import jsPDF from 'jspdf'
export default {
    name: 'Solicitudes',
    components: {
        loading,
    },
    data() {
        return {
            drawer: null,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            fecha: null,
            toggle: null,
            temas: [],
            cargando_temas:true,
            itemsOrdenar: [
                { title: 'Por titulo', prop: 'title' },
                {
                    title: 'Por creador',
                    prop: 'creador',
                },
                {
                    title: 'Por fecha',
                    prop: 'fecha',
                },
            ],
        };
    },
    created() {
        this.cargar_temas()
    },
    methods: {
        cargar_temas() {
            this.axios.get("todos_temas")
                .then((response) => {
                    this.axios.get("todos_usuarios").then((resp)=>{
                        this.temas = response.data
                        const usuarios = resp.data
                        for(var i=0; i<this.temas.length;i++){
                            let creador = usuarios.filter(u => u._id === this.temas[i].idCreador)
                            this.temas[i].nombreCreador=creador[0].nombre
                            for(var j=0; j<this.temas[i].votos.length;j++){
                                if(this.temas[i].votos[j].refcomite===localStorage.getItem("key_user")){
                                    this.temas[i].voto_usuario_sesion=this.temas[i].votos[j].voto
                                }
                                let comite = usuarios.filter(u => u._id === this.temas[i].votos[j].refcomite)
                                this.temas[i].votos[j].nombrecomite=comite[0].nombre
                                this.temas[i].votos[j].imgcomite=comite[0].img
                            }
                        }
                        this.cargando_temas=false
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        exportPDF(titulo,estudiante) {
            let pdfName = 'Acta';

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: "letter"
            });

            doc.setFontSize(18).text("Acta Veredicto Del Consejo", 0.5, 1.0);
            doc.setLineWidth(0.01).line(0.5,1.1,8.0,1.1);
            doc
                .setFont("helvetica")
                .setFontSize(12)
                .text( "Luego de una exhaustiva reunión de los integrantes del comtité en la cual se ha logrado llegar a una conclusión, "+
                        " se presentan los resultados de la votación de la solicitud del tema "
                        +titulo+" propuesto por "+estudiante+
                         ". ", 0.5,2.0,{align:"left",maxWidth:"7.5"});
            doc
                .setFont("helvetica")
                .setFontSize(12)
                .text("Por consiguiente se muestran los intregantes del comité que votaron:",0.5,2.7,{align:"left",maxWidth:"7.5"});
            doc
                .setFont("helvetica")
                .setFontSize(12)
                .text( "1.-" ,0.5,3.4,{align:"left",maxWidth:"7.5"});
            doc
                .setFont("helvetica")
                .setFontSize(12)
                .text( "2.-" ,0.5,4.1,{align:"left",maxWidth:"7.5"});
            doc
                .setFont("helvetica")
                .setFontSize(12)
                .text( "3.-" ,0.5,4.8,{align:"left",maxWidth:"7.5"});
                doc
                .setFont("helvetica")
                .setFontSize(12)
                .text( "Dando asi como resultado que la propuesta es " + ". " ,0.5,5.5,{align:"left",maxWidth:"7.5"});

            doc
                .setFont("times")
                .setFontSize(10)
                .text("Documento validado y verificado por la Universidad de Talca.",
                0.5,
                doc.internal.pageSize.height - 0.5)
            doc.save(pdfName + '.pdf');
        },
        sortBy(prop) {
            this.solicitudes.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
        },
        verSolicitud(titulo, descripcion, estudiante, fecha) {
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

<style>
.v-list-item:hover {
    background: #f5a42a;
}
</style>