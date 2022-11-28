
<template>
    <div>
        <loading></loading>

        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <div class="one"> 
            <h1>Direccion de Escuela: Agregar Usuario</h1> 
            <notificacion></notificacion>
            </div>
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;
            top:20%;
            left: 50%;" v-if="usuarios.length == 0">

            </v-progress-circular>
            <v-container class="my-3">

                <v-layout row class="mx-1 my-1">
                    <v-row>
                        <v-col md="5">
                            <v-text-field append-icon="mdi-magnify" v-model="search" label="Buscar" single-line
                                hide-details="">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-spacer></v-spacer>

                    <v-menu offset-y>
                        <template v-slot:activator="{}">
                            <v-btn color="pink" class="mb-5 white--text" @click="mostrarDialogo()">
                                Agregar Usuarios
                            </v-btn>
                        </template>
                    </v-menu>

                </v-layout>
                <v-spacer></v-spacer>
                <div>
                    <v-card color="light-blue accent-2 white--text">
                        <v-card-title>
                            Usuarios
                            <v-divider class="mx-6" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-data-table :items="usuarios" :headers="headers" :search="search" :items-per-page="5"
                            v-if="usuarios.length > 0">
                            <template v-slot:item._id="{ item }">
                                <v-btn color="light-blue accent-2 white--text" @click="mostrarInfo(item)">ver más
                                </v-btn>
                            </template>
                        </v-data-table>

                    </v-card>
                </div>
            </v-container>
            <!-- drawer agregar alumnos -->
            <v-container>
                <v-dialog v-model="drawerAgregarAlumnos" width=50%>
                    <v-stepper v-model="e1">
                        <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1" color="pink">
                                Descargar Plantilla
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="e1 > 2" step="2" color="pink">
                                Importar datos
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step color="pink" step="3">
                                Confirmacion
                            </v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card flat class="mb-12 overflow-y-auto" height="260px">
                                    <v-card-title class="justify-center">Ingresar usuarios</v-card-title>

                                    <v-card-text>
                                        <v-spacer />
                                        <div>
                                            <div class="black--text">Esta plantilla contiene 7 columnas, las cuales debe
                                                ingresar los datos solicitados. <br> Para ingresar un cargo marque una X
                                                en la casilla correspondiente, en su defecto deje el campo vacío <br>Por
                                                ejemplo: </div>
                                            <div>
                                                <v-img
                                                    src="https://media.discordapp.net/attachments/1016527313954934864/1044729986919190568/image.png">
                                                </v-img>
                                            </div>
                                        </div>
                                        <v-spacer />
                                    </v-card-text>
                                    <v-spacer />
                                    <div class="text-center">
                                        <v-btn color="pink" class="white--text" @click="descargarPlantilla()">
                                            <v-icon dark> mdi-download </v-icon>
                                            Descargar
                                        </v-btn>
                                    </div>
                                    <v-spacer />

                                </v-card>
                                <v-btn color="pink" class="white--text" @click="e1 = 2">
                                    Siguiente
                                </v-btn>
                                <v-btn @click="drawerAgregarAlumnos = false" text>
                                    Cancelar
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card flat class="mb-12 overflow-y-auto" height="260px">

                                    <v-card-title class="justify-center">Importar datos archivo XLSX</v-card-title>
                                    <v-card-text>
                                        <v-spacer />
                                        <div>
                                            <div class="black--text">Debe subir el archivo XLSX con todos los datos ya
                                                ingresados.</div>
                                        </div>
                                        <v-spacer />
                                    </v-card-text>
                                    <v-card-actions class="justify-center">
                                        <v-data-table hide-default-footer :items="datosImportados"
                                            :headers="headers_table" v-if="datosImportados.length > 0"></v-data-table>
                                    </v-card-actions>
                                    <input id="archivoExcel" type="file" class="ml-4" @change="importarDatos()" />
                                </v-card>
                                <v-btn color="pink" class="white--text" @click="e1 = 3">
                                    Siguiente
                                </v-btn>
                                <v-btn @click="e1 = 1" text>
                                    Volver
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card flat class="mb-12 overflow-y-auto" height="150px">
                                    <v-card-title class="justify-center">
                                        Confirmar ingreso de usuarios
                                    </v-card-title>
                                    <v-card-text>
                                        <v-spacer />
                                        <div class="text-center">
                                            <div class="black--text -- font-size:40px">
                                                ¿Esta de ingresar los datos?
                                            </div>
                                        </div>

                                        <v-spacer />
                                    </v-card-text>
                                </v-card>
                                <v-btn @click="enviarUsuarios()" color="pink" class="white--text">
                                    Confirmar
                                </v-btn>

                                <v-btn @click="e1 = 2" text>
                                    Volver
                                </v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-dialog>
                <!-- dialogo de mas informacion del usuario -->
                <v-dialog v-model="drawerInfoAlumnos" width=50%>
                    <v-scroll-y-transition mode="out-in">
                        <v-card class="d-flex text-center" flat>
                            <v-card-text>
                                <v-avatar class="mt-4" size="150">
                                    <v-img :src="alumno_seleccionado.img">
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="black"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-avatar>
                                <h3 class="text-h5 mb-2">
                                    {{ alumno_seleccionado.nombre }}
                                </h3>
                                <div class="blue--text mb-2">
                                    {{ alumno_seleccionado.correo }}
                                </div>
                                <div class=" mb-2">
                                    {{ alumno_seleccionado.matricula }}
                                </div>
                                <!-- falta agregar los roles que tienen -->
                            </v-card-text>
                        </v-card>
                    </v-scroll-y-transition>
                </v-dialog>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import readXLS from "read-excel-file"
import exportFromJSON from "export-from-json"
import loading from '@/components/loading.vue';
import Swal from 'sweetalert2'
import notificacion from "@/components/notificacion.vue"
export default ({
    data() {
        return {
            search: '',
            e1: 1,
            drawer: null,
            drawerAgregarAlumnos: null,
            drawerInfoAlumnos: null,
            datosImportados: [],
            items: [],
            usuarios: [],
            headers: [
                { text: 'NOMBRE', value: 'nombre' },
                { text: 'CORREO', value: 'correo' },
                { text: 'INFORMACION', value: '_id' },
            ],
            headers_table: [
                { text: 'nombre', value: '0' },
                { text: 'matricula', value: '1' },
                { text: 'correo', value: '2' },
                { text: 'alumno', value: '3' },
                { text: 'profesor', value: '4' },
                { text: 'comite', value: '5' },
                { text: 'directora', value: '6' },
            ],
            alumno_seleccionado: {},
        }
    },
    components: {
        readXLS,
        loading,
        Swal,
        notificacion
    },
    created() {
        this.cargar_usuarios()
    },
    methods: {
        enviarNotificacion(){
            var notificacion={
                notificacion:null,
                visto:false,
                id_ref:null
            }
             // Notificacion a la directora
            notificacion.id_ref=localStorage.getItem("key_user")
            notificacion.notificacion="Has creado nuevos usuarios"
            this.axios.post("nuevo_notificacion",notificacion)
        },
        cargar_usuarios() {
            this.axios.get("todos_usuarios")
                .then((response) => {
                    this.usuarios = response.data
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        mostrarDialogo() {
            this.drawerAgregarAlumnos = true
        },
        mostrarInfo(alumno) {
            this.alumno_seleccionado = alumno
            this.drawerInfoAlumnos = true
        },
        importarDatos() {
            const eliminar_encabezado = []
            const entrada = document.getElementById("archivoExcel")
            readXLS(entrada.files[0]).then((rows) => {
                this.datosImportados = rows
                for (var i = 0; i < this.datosImportados.length; i++) {
                    if (i >= 2) {
                        eliminar_encabezado.push(this.datosImportados[i])
                    }
                }
                this.datosImportados = eliminar_encabezado
            })
        },
        descargarPlantilla() {
            const data = [['nombre', 'matricula', 'correo', 'alumno', 'profesor', 'comite', 'directora']]
            const fileName = "plantillaIngresoAlumnos"
            const exportType = exportFromJSON.types.xls
            exportFromJSON({ data, fileName, exportType })
        },
        enviarUsuarios() {
            console.log(this.datosImportados)
            this.drawerAgregarAlumnos = false
            Swal.fire({
                title: '¿Estas seguro?',
                text: "No puedes revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.state.loading = true
                    for (var i = 0; i < this.datosImportados.length; i++) {
                        var alumnoingresar = {
                            nombre: "",
                            matricula: "",
                            correo: "",
                            contrasena: "12345",
                            trabaja: null,
                            modulos_faltantes: [],
                            esprofe: null,
                            esalumno: null,
                            escomite: null,
                            esdirector: null,
                            esmemorista:false,
                            rolActivo: "",
                            img: "https://i.ibb.co/T2J4034/download.png",
                        }
                        alumnoingresar.nombre = this.datosImportados[i][0]
                        alumnoingresar.matricula = this.datosImportados[i][1]
                        alumnoingresar.correo = this.datosImportados[i][2]
                        if (this.datosImportados[i][3] == "X" || this.datosImportados[i][3] == "x") {
                            alumnoingresar.esalumno = true
                            alumnoingresar.rolActivo = "Alumno"
                        }
                        else {
                            alumnoingresar.esalumno = false
                        }
                        if (this.datosImportados[i][4] == "X" || this.datosImportados[i][4] == "x") {
                            alumnoingresar.esprofe = true
                            alumnoingresar.rolActivo = "Profesor"
                        }
                        else {
                            alumnoingresar.esprofe = false
                        }
                        if (this.datosImportados[i][5] == "X" || this.datosImportados[i][5] == "x") {
                            alumnoingresar.escomite = true
                            alumnoingresar.rolActivo = "Comite"
                        }
                        else {
                            alumnoingresar.escomite = false
                        }
                        if (this.datosImportados[i][6] == "X" || this.datosImportados[i][6] == "x") {
                            alumnoingresar.esdirector = true
                            alumnoingresar.rolActivo = "Director"
                        }
                        else {
                            alumnoingresar.esdirector = false
                        }
                        this.e1 = 1
                        this.enviarNotificacion()
                        this.axios.post("nuevo_usuario", alumnoingresar).then(() => {

                        }).catch((e) => {
                            console.log(e)
                        })
                    }
                    this.$store.commit('cargar_datos')
                }
            })
        }
    }
})
</script>

<style>
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