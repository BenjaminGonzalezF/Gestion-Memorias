<template>
    <div class="Solicitudes">
        <div class="one">
            <h1>Comité Curricular: Historial Solicitudes de Memorias</h1>
            <notificacion></notificacion>
        </div>
        <v-layout row class="mx-6">
            <v-col cols="12" sm="6" md="4">
                <v-autocomplete max-width="400" rounded solo-inverted v-model="buscar" :items="temasHistorial" @change="busqueda()"
                    color="white" item-text="nombre" item-title="nombre" label="Buscar proyectos"
                    placeholder="Escribe para buscar" prepend-icon="mdi-database-search">
                </v-autocomplete>
            </v-col>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-spacer></v-spacer>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed color="#f5a42a" class="mb-5" dark small v-bind="attrs" v-on="on">
                        Ordenar
                        <v-icon right small>mdi-sort</v-icon>
                    </v-btn>
                </template>
            </v-menu>
        </v-layout>
        <v-card height="500" width="100%" outlined class="overflow-y-auto">
            <v-container>
                <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
                    <v-progress-circular :size="50" color="primary" indeterminate
                        style="position: absolute;top:20%;left: 50%;" v-if="cargando_temas == true">
                    </v-progress-circular>
                    <div v-else>
                        <v-container class="my-3">
                            <div v-for="project in temasHistorial" :key="project._id">
                                <v-card color="rgb(247, 247, 247)" flat class="pa-3 mb-2"
                                    v-if="project.resultado_comite != null">
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
                                                    @click="verSolicitud(project.nombre, project.descripcion, project.nombreCreador, project.fechacambio, project.requisitos)">
                                                    Ver más
                                                </v-btn>
                                            </div>
                                        </v-flex>
                                        <v-flex xs2 sm1 md2>
                                            <div class="caption grey--text">Votos</div>
                                            <v-tooltip bottom v-for="(voto, index) in project.votos" :key="index">
                                                <template v-slot:activator="{ on, attrs }" v-if="voto.voto !== null">
                                                    <v-avatar size="30" v-bind="attrs" v-on="on">
                                                        <img :src="voto.imgcomite" v-if="voto.voto !== null" />
                                                    </v-avatar>
                                                </template>
                                                <span v-if="voto.voto === true">{{ voto.nombrecomite }} =
                                                    Aceptado</span>
                                                <span v-if="voto.voto === false">{{ voto.nombrecomite }} =
                                                    Rechazado</span>

                                            </v-tooltip>

                                        </v-flex>
                                        <v-flex xs2 sm1 md2>
                                            <v-btn class="ml-6 white--text" color="#FF0182" @click="exportPDF(project)">
                                                PDF<v-img max-height="15" max-width="15" height="5%" width="auto"
                                                    src="@/assets/download.png">
                                                </v-img>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </div>
                            <v-dialog v-model="drawerSolicitud" max-width=50%>
                                <v-card max-width=100%>
                                    <v-container class="grey lighten-5" >
                                        <v-row >
                                            <v-col >
                                                <v-card max-height=100%>
                                                    <v-card-title>
                                                        <span class="text-h3">Datos proyecto</span>
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-container>
                                                            <v-flex>
                                                                <div class="caption black--text"><h2>Titulo proyecto:</h2></div>
                                                                <div> <h4> {{ tituloProyecto }}</h4></div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text"><h2> Descripcion general
                                                                    proyecto:</h2>
                                                                </div>
                                                                <div> <h4> {{ descripcionProyecto }}</h4> </div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text"><h2>Requisitos:</h2></div>
                                                                <div v-for="(requisito, index) in requisitos" :key="index">
                                                                 <h4> <li> {{requisito}} </li> </h4> 
                                                                </div>
                                                            </v-flex>
                                                            <v-flex>
                                                                <div class="caption black--text"><h2>Creador:</h2></div>
                                                                <div> <h4> {{ estudiante }}</h4></div>
                                                            </v-flex>
                                                        </v-container>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                            </v-dialog>
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
            </v-container>
        </v-card>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2'
import loading from '@/components/loading.vue';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import notificacion from "@/components/notificacion.vue"
export default {
    name: 'Solicitudes',
    components: {
        loading,
        notificacion
    },
    data() {
        return {
            drawer: null,
            toggle: false,
            drawerSolicitud: false,
            tituloProyecto: null,
            descripcionProyecto: null,
            estudiante: null,
            fecha: null,
            toggle: null,
            temas: [],
            temasRespaldo: null,
            temasBuscar: null,
            temasHistorial: [],
            cargando_temas: true,
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
                    this.axios.get("todos_usuarios").then((resp) => {
                        this.temas = response.data
                        const usuarios = resp.data
                        for (var i = 0; i < this.temas.length; i++) {
                            let creador = usuarios.filter(u => u._id === this.temas[i].idCreador)
                            this.temas[i].nombreCreador = creador[0].nombre
                            for (var j = 0; j < this.temas[i].votos.length; j++) {
                                if (this.temas[i].votos[j].refcomite === localStorage.getItem("key_user")) {
                                    this.temas[i].voto_usuario_sesion = this.temas[i].votos[j].voto
                                }
                                let comite = usuarios.filter(u => u._id === this.temas[i].votos[j].refcomite)
                                this.temas[i].votos[j].nombrecomite = comite[0].nombre
                                this.temas[i].votos[j].imgcomite = comite[0].img
                            }
                            if (this.temas[i].resultado_comite != null) {
                                this.temasHistorial.push(this.temas[i])
                            }
                        }
                        this.temasRespaldo = this.temasHistorial
                        this.cargando_temas = false
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        exportPDF(tema) {
            let pdfName = 'Acta';
            var pdf = new jsPDF({
                orientation: "p",
                unit: "cm",
                format: "letter"
            });
            var tituloTema = tema.nombre
            var colaborador = tema.nombreCreador
            var resultado = null
            if (tema.resultado_comite == true) {
                resultado = "Aprobada"
            } else {
                resultado = "Rechazada"
            }
            var votosApruebo = null
            var votosRechazo = null

            for (var i = 0; i < tema.votos.length; i++) {
                if (true == tema.votos[i].voto) {
                    votosApruebo = votosApruebo + 1
                } else {
                    votosRechazo = votosRechazo + 1
                }
            }

            var fechaActa = tema.fechacambio
            var comite1 = null
            var comite2 = null
            var comite3 = null
            for (var i = 0; i < tema.votos.length; i++) {
                if (i == 0) {
                    comite1 = tema.votos[i].nombrecomite
                } else if (i == 1) {
                    comite2 = tema.votos[i].nombrecomite
                } else if (i == 2) {
                    comite3 = tema.votos[i].nombrecomite
                }
            }

            var img = new Image;
            var img2 = new Image;

            img.onload = function () {
                pdf.addImage(this, 3, 1, 2, 2);
            };

            img2.onload = function () {
                pdf.addImage(this, 15, 1, 3, 2);
                pdf.save(pdfName + '.pdf');
            };

            img.crossOrigin = "";
            img.src = "//i.imgur.com/2QXaKmk.png";
            img2.src = "//i.imgur.com/KEhaByh.jpg";
            pdf.setFontSize(18).text("Resolución Comité", 7.5, 5.0);
            pdf.setLineWidth(0.01).line(1, 5.1, 20.0, 5.1);
            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text("Luego de una exhaustiva reunión de los integrantes del comité en la cual se ha logrado llegar a una conclusión, " +
                    " se presentan los resultados de la votación de la solicitud del tema "
                    + tituloTema + " propuesto por " + colaborador +
                    ". ", 1.3, 6.5, { maxWidth: "17.5" });
            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text("Por consiguiente se muestran los intregantes del comité que votaron:", 1.3, 8.5, { align: "left", maxWidth: "20.5" });
            pdf
                .setFont("helvetica")
                .setFontSize(12)

                .text("1.- " + comite1, 1.9, 10, { align: "left", maxWidth: "15.5" });
            pdf
                .setFont("helvetica")
                .setFontSize(12)

                .text("2.-" + comite2, 1.9, 11, { align: "left", maxWidth: "15.5" });
            pdf
                .setFont("helvetica")
                .setFontSize(12)

                .text("3.-" + comite3, 1.9, 12, { align: "left", maxWidth: "15.5" });

            if (votosRechazo == 3 || votosApruebo == 3) {
                pdf
                    .setFont("helvetica")
                    .setFontSize(12)

                    .text("Tras el recuento de los votos, se a conseguido de forma unánime que la propuesta es "
                        + resultado + ". ", 1.3, 13.5, { align: "left", maxWidth: "15.5" });
            }else if (votosRechazo != votosApruebo ) {
                pdf
                    .setFont("helvetica")
                    .setFontSize(12)

                    .text("Tras el recuento de los votos, con "+ votosApruebo + " voto aprobado y "+votosRechazo+ " voto rechazado, se a conseguido que la propuesta es "
                        + resultado + ". ", 1.3, 13.5, { align: "left", maxWidth: "15.5" });
            }
            
            

            pdf.setLineWidth(0.01).line(3.5, 17.5, 9.5, 17.5);
            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text(comite1, 5, 18, { align: "left", maxWidth: "15.5" });


            pdf.setLineWidth(0.01).line(11.5, 17.5, 17.5, 17.5);
            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text(comite2, 12.5, 18, { align: "left", maxWidth: "15.5" });


            pdf.setLineWidth(0.01).line(11.5, 20, 17.5, 20);
            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text("Directora de carrera", 12.5, 20.5, { align: "left", maxWidth: "15.5" });

            pdf.setLineWidth(0.01).line(3.5, 20, 9.5, 20);
            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text(comite3, 4.5, 20.5, { align: "left", maxWidth: "15.5" });

            pdf
                .setFont("times")
                .setFontSize(10)

                .text("Documento validado y verificado por la Universidad de Talca. " + fechaActa,
                    0.5,
                    pdf.internal.pageSize.height - 0.5)
            //doc.save(pdfName + '.pdf');
        },
        sortBy(prop) {
            this.solicitudes.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
        },
        verSolicitud(titulo, descripcion, estudiante, fecha,requisitos) {
            this.drawerSolicitud = true
            this.tituloProyecto = titulo
            this.descripcionProyecto = descripcion
            this.estudiante = estudiante
            this.fecha = fecha
            this.requisitos = requisitos
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
        busqueda(){            
            console.log(this.buscar)
            if(this.buscar !== null){
                var buscarMinuscula = this.buscar.toLowerCase()
                this.temasBuscar = this.temasRespaldo.filter(temas => temas.nombre.toLowerCase().indexOf(buscarMinuscula) !== -1)
                this.temasHistorial=this.temasBuscar
            }else{
                console.log("akjdsakldask")
                this.temasHistorial = this.temasRespaldo

            }
            
        }
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