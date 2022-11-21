<template>
    <div>
        <loading></loading>
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <v-progress-circular :size="50" color="primary" indeterminate style="position: absolute;
            top:20%;
            left: 50%;" v-if="usuarios.length == 0">
            
            </v-progress-circular>
            <v-container class="my-3">
                <v-layout row class="mx-1 my-1">
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
                    <v-card>
                        <v-card-title>
                            Usuarios
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                                hide-details></v-text-field>
                        </v-card-title>

                        <v-data-table :items="usuarios" :headers="headers" :search="search" :items-per-page="5"
                            v-if="usuarios.length > 0">
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
                                <v-card class="mb-12 overflow-y-auto" color="grey lighten-1" height="200px">
                                    <v-card-title>Descargar la plantilla XLS</v-card-title>
                                    <v-card-text> La plantilla contiene 11 columnas</v-card-text>
                                    <v-card-text> </v-card-text>
                                    <v-btn class="ml-4" @click="descargarPlantilla()">Plantilla.xls</v-btn>
                                </v-card>
                                <v-btn color="pink" class="white--text" @click="e1 = 2">
                                    Continuar
                                </v-btn>
                                <v-btn @click="drawerAgregarAlumnos = false" text>
                                    Cancelar
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card class="mb-12 overflow-y-auto" color="grey lighten-1" height="200px">

                                    <v-card-title>Importar datos XLSX</v-card-title>
                                    <v-card-text>Debe importar los datos en XLSX, siga la estrucutra de la plantilla
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-data-table :items="datosImportados" :headers="headers_table"
                                            v-if="datosImportados.length > 0"></v-data-table>
                                    </v-card-actions>
                                    <input id="archivoExcel" type="file" class="ml-4" @change="importarDatos()" />
                                </v-card>
                                <v-btn color="pink" class="white--text" @click="e1 = 3">
                                    Continue
                                </v-btn>
                                <v-btn @click="e1 = 1" text>
                                    Cancel
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                                <v-btn @click="drawerAgregarAlumnos = false" color="pink" class="white--text">
                                    Continue
                                </v-btn>

                                <v-btn @click="e1 = 2" text>
                                    Cancel
                                </v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-dialog>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import readXLS from "read-excel-file"
import exportFromJSON from "export-from-json"
import loading from '@/components/loading.vue';
export default ({
    data() {
        return {
            search: '',
            e1: 2,
            drawer: null,
            drawerAgregarAlumnos: null,
            datosImportados: [],
            items: [],
            usuarios: [],
            headers: [
                { text: 'img', value: 'img' },
                { text: 'id', value: '_id' },
                { text: 'nombre', value: 'nombre' },
                { text: 'profesor', value: 'profesor' },
                { text: 'alumno', value: 'alumno' },
            ],
            headers_table: [
                { text: 'nombre', value: '0' },
                { text: 'matricula', value: '1' },
                { text: 'correo', value: '2' },
                { text: 'contraseña', value: '3' },
                {text: 'alumno', value:'4'},
                {text: 'comite', value:'5'},
                {text: 'directora', value:'6'},
            ],
        }
    },
    components: {
        readXLS,
        loading
    },
    created() {
        this.cargar_usuarios()
    },
    methods: {
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
            const data = [['nombre', 'matricula', 'correo', 'contraseña','alumno','profesor','comite','directora']]
            const fileName = "plantillaIngresoAlumnos"
            const exportType = exportFromJSON.types.xls
            exportFromJSON({ data, fileName, exportType })
        }
    }
})
</script>
