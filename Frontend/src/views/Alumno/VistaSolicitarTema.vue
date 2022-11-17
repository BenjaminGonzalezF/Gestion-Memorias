<template>
    <v-app>
        <div align="center">
            <v-col lass="px-4">
                <h1>
                    Cursos pendientes
                </h1>
                <v-card height="250" width="80%" outlined class="overflow-y-auto" max-height="350" color="#00CCFF">
                    <v-col>
                        <v-expansion-panels accordion>
                            <v-expansion-panel v-for="ArraySemestres in semestres" :key="ArraySemestres.id">
                                <v-expansion-panel-header>
                                    <H3>{{ ArraySemestres.nombre }}</H3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-card height="100%" width="100%" color="#F4F4F4">
                                        <v-col v-for="ArrayRamos in ArraySemestres.ramos " :key="ArrayRamos.id" col="1">
                                            <v-card height="25%" width="75%" color="#FFFFFF">
                                                <v-col>
                                                    <v-row>
                                                        <v-checkbox :v-model="ArrayRamos.selected"
                                                            @click="agregar(ArrayRamos.name)"></v-checkbox>
                                                        <v-card height="25%" width="85%" outlined
                                                            class="overflow-y-auto" color="#FFFFFF">
                                                            <p class="mt-5">
                                                                {{ ArrayRamos.name }}
                                                            </p>
                                                        </v-card>
                                                    </v-row>
                                                </v-col>
                                            </v-card>
                                        </v-col>
                                    </v-card>

                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-card>
                <v-col>

                </v-col>
                <v-col>
                    <h1>
                        Datos de interes
                    </h1>
                    <v-card height="50" width="80%" color="#FFFFFF">
                        <v-select v-model="estadoselect" :items="estado" label="¿Esta trabajando?"></v-select>
                    </v-card>
                </v-col>

                <h1>
                    Información
                </h1>

                <v-card height="250" width="80%" color="#F4F4F4">
                    <v-col>

                    </v-col>
                    <v-row justify="space-around">
                        <v-card height="180" width="40%">
                            <v-col>
                                <p>
                                    Nombre: {{nombrecompleto}}
                                </p>
                                <p>
                                    Tema: {{nombretema}}
                                </p>
                                <p>
                                    Profesor Guia: {{nombreprofesor}}
                                </p>
                                <p>
                                    Cursos pendientes {{ nocursados }}
                                </p>
                            </v-col>
                        </v-card>


                        <v-card height="180" width="40%">
                            <div v-show="!estadofoto">
                                <v-col>
                                    <p> Verificación </p>
                                    <p>Ingresar imagen para validar identificación</p>
                                    <v-btn @click="AgregarImagen()" color="#f5a42a">Agregar Imagen </v-btn>
                                </v-col>
                            </div>
                            <div v-show="estadofoto">
                                <v-col>
                                    <p> Verificación </p>
                                    <v-img max-height="100" max-width="120"
                                        :src="this.imagenAlumno">
                                    </v-img>
                                </v-col>
                            </div>
                        </v-card>

                    </v-row>
                    <v-col>

                    </v-col>
                    <v-btn color="#f5a42a"
                        @click="enviardatos(nombrecompleto, nombretema, nombreprofesor, nocursados, estado, link)">
                        Enviar Solicitud
                    </v-btn>
                </v-card>

            </v-col>
            <v-dialog v-model="drawerSolicitud" max-width="1000">
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1" color="#00CCFF">
                            1. Verificación
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 2" step="2" color="#00CCFF">
                            2. Subir imagen
                        </v-stepper-step>

                        <v-divider></v-divider>


                        <v-stepper-step step="3" color="#00CCFF">
                            3. Completado
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
                                                Para continuar con la solicitud es necesario ingresar una foto (estilo
                                                cédula de identidad)
                                            </p>

                                        </v-card>



                                        <v-card height="250" width="45%">
                                            <v-col>
                                                <v-col></v-col>
                                                <p>Ejemplo de foto:</p>
                                                <v-img max-height="150" max-width="250"
                                                    src="https://previews.123rf.com/images/xmarchant/xmarchant0612/xmarchant061200005/695441-retrato-hombre-frente-a-la-c%C3%A1mara.jpg">
                                                </v-img>
                                            </v-col>
                                        </v-card>
                                    </v-row>
                                </div>


                            </v-card>

                            <v-btn color="#f5a42a" @click="e1 = 2">
                                Continuar
                            </v-btn>

                            <v-btn text @click="cerrarint()">
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
                                                A continuación se tiene que subir su imagen en alguna plataforma de
                                                almacenacimento de datos
                                                (Google Drive, Mega, One drive) y luego subir el link de la imagen
                                            </p>
                                        </v-card>
                                        <v-card height="250" width="45%">
                                            <v-col>
                                                <p class="center">Subir imagen</p>
                                                <v-text-field v-model="link" :rules="linkrules" label="Link Imagen"
                                                    required></v-text-field>
                                                <v-btn color="#f5a42a" @click="subirlink(link)" :disabled="estadofoto">
                                                    Enviar link
                                                </v-btn>
                                            </v-col>
                                        </v-card>
                                    </v-row>

                                </div>

                            </v-card>

                            <v-btn color="#f5a42a" @click="e1 = 3" :disabled="!estadofoto">
                                Continuar
                            </v-btn>

                            <v-btn text @click="cerrarint()">
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
                                    <p class="mt-5">Aceptado correctamente </p>
                                </div>

                            </v-card>

                            <v-btn color="#f5a42a" @click="cerrarint1()">
                                Finalizar
                            </v-btn>

                            <v-btn text @click="cerrarint()">
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

import headerAlumno from "@/components/headerAlumno.vue"
let Semestres = [
    {
        id: 0,
        nombre: "Semestre 1",
        ramos: [
            {
                name: "Introducción a la ICC",
                selected: null
            },
            {
                name: "Introducción a la Programación",
                selected: null
            },
            {
                name: "Teoria de Sistema",
                selected: null
            },
            {
                name: "Introducción a la Matemática",
                selected: null
            },
            {
                name: "Comunicación Oral y Escrita I",
                selected: null
            },
            {
                name: "Idioma Extranjero I",
                selected: null
            }
        ],
    },
    {
        id: 1,
        nombre: "Semestre 2",
        ramos: [
            {
                name: "Interfaz Humano Computador",
                selected: null
            },
            {
                name: "Pensamiento Computacional ",
                selected: null
            },
            {
                name: "Algebra",
                selected: null
            },
            {
                name: "Cálculo",
                selected: null
            },
            {
                name: "Comunicación Oral y Escrita II",
                selected: null
            },
            {
                name: "Idioma Extranjero II",
                selected: null
            },
            {
                name: "Deportes I",
                selected: null
            }
        ],
    },
    {
        id: 2,
        nombre: "Semestre 3",
        ramos: [
            {
                name: "Programación Avanzada",
                selected: null
            },
            {
                name: "Lenguaje y Paradigmas de Programación",
                selected: null
            },
            {
                name: "Algebra Lineal",
                selected: null
            },
            {
                name: "Cálculo II",
                selected: null
            },
            {
                name: "Autogestión de Aprendizaje",
                selected: null
            },
            {
                name: "Idioma Extranjero III",
                selected: null
            }
        ],
    },
    {
        id: 3,
        nombre: "Semestre 4",
        ramos: [
            {
                name: "Proyecto de Programacion",
                selected: null
            },
            {
                name: "Algoritmos y Estruturas de Datos",
                selected: null
            },
            {
                name: "Modelos Discretos",
                selected: null
            },
            {
                name: "Probabilidades y Estadística",
                selected: null
            },
            {
                name: "Trabajo en Equipo y Desarrollo de Habilidades Sociales",
                selected: null
            },
            {
                name: "Idioma Extranjero IV",
                selected: null
            },
            {
                name: "Deportes II",
                selected: null
            }
        ],
    },
    {
        id: 4,
        nombre: "Semestre 5",
        ramos: [
            {
                name: "Requisitos de Sofware",
                selected: null
            },
            {
                name: "Metodologías de Desarrollo y Plani. de Proyectos de Sof.",
                selected: null
            },
            {
                name: "Diseño de Base de Datos",
                selected: null
            },
            {
                name: "Ecuaciones Diferenciales",
                selected: null
            },
            {
                name: "Física General",
                selected: null
            },
            {
                name: "Comprensión de Contextos Sociales",
                selected: null
            },
            {
                name: "Idioma Extranjero V",
                selected: null
            }
        ],
    },
    {
        id: 5,
        nombre: "Semestre 6",
        ramos: [
            {
                name: "Diseño de Software",
                selected: null
            },
            {
                name: "Máquinas Abstractas y Lenguajes Formales",
                selected: null
            },
            {
                name: "Arq. de Computadores y Diseño de Circulos Digitales",
                selected: null
            },
            {
                name: "Electricidad y Magnetismo",
                selected: null
            },
            {
                name: "Comprensión de Contexto Culturales",
                selected: null
            },
            {
                name: "Idioma Extranjero VI",
                selected: null
            }
        ],
    },
    {
        id: 6,
        nombre: "Semestre 7",
        ramos: [
            {
                name: "Construcción de Software",
                selected: null
            },
            {
                name: "Gestión de Base de Datos",
                selected: null
            },
            {
                name: "Sistemas Operativos",
                selected: null
            },
            {
                name: "Redes de Computadores",
                selected: null
            },
            {
                name: "Fundamentos de Administración",
                selected: null
            },
            {
                name: "Etica y Responsabilidad Social",
                selected: null
            }
        ],
    },
    {
        id: 7,
        nombre: "Semestre 8",
        ramos: [
            {
                name: "Electivo I",
                selected: null
            },
            {
                name: "Inteligencia Artificial",
                selected: null
            },
            {
                name: "Administración de Redes y Sistemas Computacionales",
                selected: null
            },
            {
                name: "Sistemas Distribuidos",
                selected: null
            },
            {
                name: "Ingeniería Económica y Evaluaciónes de Proyectos",
                selected: null
            },
            {
                name: "Responsabilidad Social",
                selected: null
            }
        ],
    },
    {
        id: 8,
        nombre: "Semestre 9",
        ramos: [
            {
                name: "Taller de Desarrollo de Software",
                selected: null
            },
            {
                name: "Seguridad Informática",
                selected: null
            },
            {
                name: "Electivo II",
                selected: null
            },
            {
                name: "Gestión de Proyectos Tecnológicos",
                selected: null
            },
            {
                name: "Gestión de Recursos Humanos",
                selected: null
            }
        ],
    },
    {
        id: 9,
        nombre: "Semestre 10",
        ramos: [
            {
                name: "Foemulación de Proyecto de Titulación",
                selected: null
            },
            {
                name: "Electivo III",
                selected: null
            },
            {
                name: "Gestión de Innovación y Emprendimiento",
                selected: null
            }
        ],
    },
    {
        id: 10,
        nombre: "Semestre 11",
        ramos: [
            {
                name: "Proyecto de Titulación",
                selected: null
            },
            {
                name: "Electivo IV",
                selected: null
            }
        ],
    },

]
export default {
    data() {
        return {
            semestres: [],
            nocursados: [],
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            drawerSolicitud: false,
            e1: 1,
            estado: ['Trabaja', 'No trabaja'],
            estadofoto: false,
            estadofoto1: false,
            link: null,
            linkrules: [
                v => !!v || 'Link es obligatorio',
                //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            nombrecompleto: null,
            nombretema: null,
            nombreprofesor: null,
            linkimagen: null,
            temas:[],
            estadoselect: null,
            imagenAlumno: null,
            urlvalida: null
        };
    },
    created() {
        this.cargar_datos()
        this.listarsemestres();
    },
    components: {
        headerAlumno,
    },
    methods: {
        cargar_datos() {
            this.axios.get("todos_temas")
                .then((respT) => {
                    this.axios.get("todos_usuarios").then((respU)=>{
                        const usuarios = respU.data
                        this.temas = respT.data
                        this.temas = this.temas.filter(t=>t._id ==this.$store.state.id_tema_solicitar)
                        const creador = usuarios.filter(u=> u._id ===this.temas[0].idCreador)
                        this.nombrecompleto = this.$store.state.nombre
                        this.nombretema = this.temas[0].nombre
                        this.nombreprofesor = creador[0].nombre
                        if(this.$store.state.img !=null&& this.$store.state.img !=usuario_sesion.img){
                            this.imagenAlumno=this.$store.state.img  
                            this.estadofoto = true;
                        }
                    })

                })
                .catch((e) => {
                    console.log(e)
                })
        },
        listarsemestres() {
            //console.log("Tamaño semestres"+semestres1.length) verificar ingreso
            for (var i = 0; i < Semestres.length; i++) {
                this.semestres.push(Semestres[i])
                //console.log(this.semestres[i].nombre) verificar ingreso
            }
        },

        agregar(nombre) {
            var x = 0;
            var b = true
            //console.log("Tamaño: "+this.nocursados.length)
            if (this.nocursados.length != 0) {
                for (var i = 0; i < this.nocursados.length; i++) {
                    //console.log("for: "+this.nocursados[i])
                    //console.log("===: "+nombre)
                    if (this.nocursados[i] == nombre) {
                        this.nocursados.splice(i, 1)
                        //console.log("se elimina")
                        //console.log("*********************************************************")
                        b = true
                        break;

                    } else {
                        b = false

                    }
                }
            } else {
                b = false
            }
            if (!b) {
                for (var i = 0; i < this.semestres.length; i++) {
                    //console.log("semestre for: "+this.semestres[i].nombre) 
                    for (var a = 0; a < this.semestres[i].ramos.length; a++) {
                        //console.log("for: "+this.semestres[i].ramos[a].name)
                        //console.log("===: "+nombre)
                        if (this.semestres[i].ramos[a].name == nombre) {
                            this.nocursados.push(nombre)
                            //console.log("se agrego correctamente+"+this.semestres[i].ramos[a].name)
                            //console.log("*********************************************************")
                            x = 1;
                            break;
                        }

                    }
                    if (x == 1) {
                        x = 0
                        break;
                    }

                }
            }

        },
        AgregarImagen() {
            this.drawerSolicitud = true;


        },
        cerrarint() {
            this.drawerSolicitud = false;
            this.e1 = 1
        },
        cerrarint1() {
            this.drawerSolicitud = false;
            this.estadofoto = true;

        },
        subirlink(url) {
            console.log("valor vaule: " + url)
            //guardar value que es el link en la vase de datos
            //si se guarda correctamente
            var validUrl= /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i
            if(validUrl.test(url)){
               this.urlvalida=true 
            }else{
                this.urlvalida=false
            }
            console.log("validaurl : "+this.urlvalida)
            if (this.urlvalida) {
                this.linkimagen = "https://previews.123rf.com/images/xmarchant/xmarchant0612/xmarchant061200005/695441-retrato-hombre-frente-a-la-c%C3%A1mara.jpg"
                this.imagenAlumno = url
                console.log("link: "+this.linkimagen)
                console.log("valur "+this.imagenAlumno)
                this.estadofoto = true;

            } else {
                //error 
                console.log("url invalida ingresa otra")
            }
        },
        enviardatos(nombre, nombreproyecto, nombreprofesor, cursospendientes, estadotrabajo, linkfoto) {
            console.log("valor nombre: " + nombre)
            console.log("valor nombre proyecto: " + nombreproyecto)
            console.log("valor nombre profesor: " + nombreprofesor)
            console.log("valor cursos pendientes : " + cursospendientes)
            //como se cual esta activo?
            console.log("valor trabaja?: " + this.estadoselect)
            console.log("valor link foto: " + linkfoto)
            console.log("valor link foto2: " + this.imagenAlumno)
        },

    },
}

</script>