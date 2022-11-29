<template>
    <v-app>
        <div align="center">
            <v-col lass="px-4">
                <h1>
                    Su proyecto se encuentra aprobado
                    <v-img class="columnas espacio" max-height="60" max-width="40" height="auto" width="auto"
                        src="@/assets/check.png"></v-img>
                </h1>
                <v-card height="250" width="80%" outlined class="overflow-y-auto" max-height="350" color="#00CCFF">
                    <v-col>
                        <p>
                            Por favor siga los siguientes pasos para validad su certificado:
                        </p>
                        <div class="botonComenzar">
                            <v-btn color="#f5a42a" @click="mostrarDialogo()">Comenzar
                            </v-btn>
                        </div>
                    </v-col>
                </v-card>
                <h1>
                    Información
                </h1>
                <v-card height="220" width="80%" color="#F4F4F4">
                    <v-col>
                    </v-col>
                    <v-row justify="space-around">
                        <v-card height="200" width="50%">
                            <v-col>
                                <p>
                                    Alumno: {{ tema.nombrealumno }}
                                </p>
                                <p>
                                    Tema: {{ tema.nombretema }}
                                </p>
                                <p>
                                    Profesor Guia: {{ tema.profeguia }}
                                </p>
                                <p>
                                    Detalles Del Tema: {{ tema.descripciontema }}
                                </p>
                            </v-col>
                        </v-card>
                    </v-row>
                </v-card>
            </v-col>
            <v-dialog v-model="drawerSolicitud" max-width="1000">
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1" color="#00CCFF">
                            1. Descargar
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 2" step="2" color="#00CCFF">
                            2. Subir Archivo PDF
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3" color="#00CCFF">
                            3. Verificar
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card height="300px" color="#F4F4F4">
                                <div align="center">
                                    <v-col></v-col>
                                    <v-row justify="space-around">
                                        <v-card height="250" width="45%">
                                            <v-col></v-col>
                                            <p class="mt-10">
                                                Para continuar con la solicitud es necesario que descargue el archivo
                                                PDF
                                            </p>
                                        </v-card>
                                        <v-card height="250" width="45%" color="#00CCFF">
                                            <div class="botonPDF">
                                                <v-btn color="#f5a42a" v-on:click="createPDF()">PDF<v-img
                                                        max-height="20" max-width="20" height="5%" width="auto"
                                                        src="@/assets/download.png">
                                                    </v-img>
                                                </v-btn>
                                            </div>
                                        </v-card>
                                    </v-row>
                                </div>
                            </v-card>
                            <v-btn color="#f5a42a" @click="e1 = 2">
                                Continuar
                            </v-btn>
                            <v-btn text @click="drawerSolicitud = false">
                                Cancelar
                            </v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-card height="300px" color="#F4F4F4">
                                <div align="center">
                                    <v-col></v-col>
                                    <v-row justify="space-around">
                                        <v-card height="250" width="45%">
                                            <v-col></v-col>
                                            <p class="mt-10">
                                                A continuación se tiene que subir el archivo PDF en alguna plataforma de
                                                almacenacimento de datos
                                                (Google Drive, Mega, One drive) y luego subir el link de la imagen
                                            </p>
                                        </v-card>
                                        <v-card height="250" width="45%">
                                            <v-col>
                                                <p class="center">Subir Archivo PDF</p>
                                                <v-text-field v-model="link" label="Link Imagen"
                                                    required></v-text-field>
                                                <v-btn color="#f5a42a" @click="subirlink(link)">
                                                    Enviar link
                                                </v-btn>
                                            </v-col>
                                        </v-card>
                                    </v-row>
                                </div>
                            </v-card>
                            <v-btn color="#f5a42a" @click="e1 = 3">
                                Continuar
                            </v-btn>
                            <v-btn text @click="drawerSolicitud = false">
                                Cancelar
                            </v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <v-card height="300px" color="#F4F4F4">
                                <div align="center">
                                    <v-col></v-col>
                                    <v-col></v-col>
                                    <v-col></v-col>
                                    <v-col></v-col>
                                    <p class="mt-5">Archivo Aceptado Correctamente </p>
                                </div>
                            </v-card>
                            <v-btn color="#f5a42a" @click="drawerSolicitud = false">
                                Finalizar
                            </v-btn>
                            <v-btn text @click="drawerSolicitud = false">
                                Cancelar
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-dialog>
        </div>
    </v-app>
</template>

<script>
import headerProfe from '@/components/headerProfe.vue'
import jsPDF from 'jspdf'

export default {
    components: { headerProfe },
    data() {
        return {
            idTema: "",
            tema: {
                nombrealumno:null,
                nombretema:null,
                profeguia:null,
                descripciontema:null,
            },
            participantes: [],
            drawerSolicitud: null,
            e1:1,
            link:null,
        }
    },
    created() {
        this.idTema = this.$route.params.id;
        this.obtenerTema(this.idTema);
    },
    methods: {
        obtenerTema(temaId) {
            this.axios.get("todos_solicitudes").then((respS) => {
                const solicitudes = respS.data
                var solicitud_aprobada = solicitudes.find(s=> s.alumnoid==localStorage.getItem("key_user") && s.estado==true)
                this.axios.get("todos_usuarios").then((respU)=>{
                    this.axios.get("todos_temas").then((respT)=>{
                        const usuarios = respU.data
                        const temas = respT.data
                        var alumno_memorista = usuarios.find(u=> u._id == solicitud_aprobada.alumnoid)
                        var profeguia = usuarios.find(u=> u._id == solicitud_aprobada.profeguiaid)
                        var tema_alumno = temas.find(t=> t._id == solicitud_aprobada.temaid)
                        this.tema.nombrealumno = alumno_memorista.nombre
                        this.tema.nombretema = tema_alumno.nombre
                        this.tema.profeguia = profeguia.nombre
                        this.tema.descripciontema=tema_alumno.descripcion
                    })
                })
            })
        },
        createPDF() {
            var pdf = new jsPDF('p', 'mm', 'letter');

            pdf.setFontSize(22);
            pdf.setFontSize(16);

            var img = new Image;
            var img2 = new Image;

            img.onload = function () {
                pdf.addImage(this, 10, 10, 25, 25);
            };

            img2.onload = function () {
                pdf.addImage(this, 135, 10, 60, 25);
                pdf.save("Cerificado acreditación.pdf");
            };

            img.crossOrigin = "";
            img.src = "//i.imgur.com/Hjs2ccm.png";
            img2.src = "//i.imgur.com/KEhaByh.jpg";

            var strArr = pdf.splitTextToSize(this.tema['descripcion'], 145)

            pdf
                .setFont("helvetica")
                .setFontSize(16)
                .text(75, 60, "Certificado Acreditación")
                .text(13, 61, "_____________________________________________________________")

            pdf
                .setFont("helvetica")
                .setFontSize(12)
            var participantes = pdf.splitTextToSize("Mediante el presente certificado emitido por la Universidad de talca, se acredita que '" + this.colaborador + "' ya cumple con los requisitos para comenzar su trabajo de tesis.", 190)
            pdf.text(13, 80, participantes)

            pdf
                .setFont("helvetica")
                .setFontSize(14)
                .text(13, 110, "Información")
                .text(13, 111, "__________")

            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text(13, 125, "Nombre del tema: " + this.tema['nombre'])
                .text(13, 135, "Profesor guía: " + this.tema['Profesor Guía'])
                .text(13, 145, "Detalles del tema: " + this.tema['descripcion'])

            pdf
                .setFont("helvetica")
                .setFontSize(12)
                .text(30, 200, "__________________")
                .text(30, 208, "Firma " + this.colaborador)
                .text(135, 200, "__________________")
                .text(133, 208, "Firma Director(a) Carrera")

            pdf
                .setFont("times")
                .setFontSize(10)
                .text(13, 270, "Documento validado y verificado por la Universidad de Talca.")

            /*pdf
            .setFont("helvetica")
            .setFontSize(12)
            .text(13, 145, strArr)*/
        },
        mostrarDialogo() {
            this.drawerSolicitud = true
        },
        subirlink(url) {
            console.log("valor vaule: " + url)
            //guardar value que es el link en la vase de datos
            //si se guarda correctamente
            var validUrl = /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i
            if (validUrl.test(url)) {
                this.urlvalida = true
            } else {
                this.urlvalida = false
            }
            console.log("validaurl : " + this.urlvalida)
            if (this.urlvalida) {
                this.imagenAlumno = url
            } else {
                //error 
                console.log("url invalida ingresa otra")
            }
        }
    }
}
</script>

<style>
.elementos {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.elemento1 {
    display: flex;
    gap: 7%;
    width: 60%;
}

.elemento2 {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 60%;
}

.columnas {
    display: inline-block;
}

.espacio {
    margin-left: 10px;
}

.botonComenzar {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-left: auto;
}

.botonPDF {
    padding-top: 25%;
    display: center;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-left: auto;
}
</style>