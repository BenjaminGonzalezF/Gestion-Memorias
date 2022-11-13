<template>
    <v-app>
     <Headerdirectora></Headerdirectora>

    <div class ="estudiantes">
       
       <div>
            <v-container class="my-3">
                <v-layout row class="mx-1 my-1">
                    <v-spacer></v-spacer>

                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="pink" class="mb-5 white--text">
                                Agregar alumnos
                            </v-btn>
                        </template>
                    </v-menu>
                    
                </v-layout>
                <v-spacer></v-spacer>
                <div v-for="(alumno, index) in alumnos" :key="index">
                    <v-card color="rgb(247, 247, 247)" flat class="pa-6 mb-2">
                        <v-layout row wrap outlined>
                            <v-flex>
                                <v-avatar>
                                    <img :src="alumno.avatar">
                                </v-avatar>
                            </v-flex>

                            <v-flex xs8 md2>
                                <div class="caption grey--text">Estudiante</div>
                                <div>{{ alumno.nombre }}</div>
                            </v-flex>
                            <v-flex xs6 md2>
                                <div class="caption grey--text">matricula</div>
                                <div>{{ alumno.matricula }}</div>
                            </v-flex>
                            <v-flex>
                                <div class="caption grey--text">Correo</div>
                                <div>{{ alumno.correo }}</div>
                            </v-flex>

                            <v-flex>
                                <div class="caption grey--text">Modulos faltantes</div>
                                <div>{{ alumno.modulosfaltantes }}</div>
                            </v-flex>
                            <v-flex xs2 sm3 md2>
                                <!-- <div class="caption grey--text">Durum</div> -->
                            </v-flex>
                            <v-flex xs6 sm1 md1>

                            </v-flex>
                        </v-layout>
                    </v-card>
                </div>
            </v-container>
        </div>

        </div>
    </v-app>
</template>

<script>
import Headerdirectora from "@/components/HeaderDirectora.vue"
export default ({
    data() {
        return {
            drawer: null,
            alumnos: [{
                nombre: "Elisenda Rodriguez",
                matricula: 2018407021,
                correo: "elrodriguez18@alumnos.utalca.cl",
                contrasena: "XRW45gVa",
                trabaja: "",
                modulosfaltantes: ["Electricidad y Magnetismo", "Programación Avanzada"],
                avatar: "/avatar.png"
            },
            {
                nombre: "Elisenda Rodriguez",
                matricula: 2018407021,
                correo: "elrodriguez18@alumnos.utalca.cl",
                contrasena: "XRW45gVa",
                trabaja: "",
                modulosfaltantes: ["Electricidad y Magnetismo", "Programación Avanzada"],
                avatar: "/avatar.png"
            },
            {
                nombre: "Elisenda Rodriguez",
                matricula: 2018407021,
                correo: "elrodriguez18@alumnos.utalca.cl",
                contrasena: "XRW45gVa",
                trabaja: "",
                modulosfaltantes: ["Electricidad y Magnetismo", "Programación Avanzada"],
                avatar: "/avatar.png"
            }]
        }
    }
})
</script>
