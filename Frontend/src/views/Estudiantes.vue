<template>
    <div>
        <v-sheet height="1000" class="overflow-hidden" style="position: relative;">
            <v-app-bar color="#00CCFF">
                <v-img max-height="40" max-width="50" src="@/assets/utal.png"></v-img>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </v-app-bar>
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
                <div>
                    <v-card color="rgb(247, 247, 247)" flat class="pa-6 mb-2">
                        <template>
                            <v-data-table
                                :headers="headers"
                                :items="alumnos"
                                :items-per-page="10"
                                class="elevation-1"
                            ></v-data-table>
                        </template>
                    </v-card>
                </div>
            </v-container>
        </v-sheet>

    </div>
</template>

<script>

export default ({
    data() {
        return {
            drawer: null,
            headers:[
                {text:'Alumno', align:"start", value:'nombre', },
                {text:'Matricula', value:'matricula'},
                {text:'Correo', value:'correo'},
                {text:'Contraseña', value:'contrasena'},
                {text:'trabaja ', value:'trabaja'},
                {text:'Modulos faltantes', value:'modulosfaltantes'},
            ],
            alumnos: [{
                nombre: "Elisenda",
                matricula: 2018407021,
                correo: "elrodriguez18@alumnos.utalca.cl",
                contrasena: "XRW45gVa",
                trabaja: "",
                modulosfaltantes: ["Electricidad y Magnetismo", "Programación Avanzada"],
                
            },
            {
                nombre: " Rodriguez",
                matricula: 2018407021,
                correo: "elrodriguez18@alumnos.utalca.cl",
                contrasena: "XRW45gVa",
                trabaja: "",
                modulosfaltantes: ["Electricidad y Magnetismo", "Programación Avanzada"],
                
            },
            {
                nombre: "s",
                matricula: 2018407021,
                correo: "elrodriguez18@alumnos.utalca.cl",
                contrasena: "XRW45gVa",
                trabaja: "",
                modulosfaltantes: ["Electricidad y Magnetismo", "Programación Avanzada"],
                /* avatar: "/avatar.png" */
            }],
           
        }
    }
})
</script>
