<template>
    <v-row justify="center">
        <!-- <v-dialog> -->
        <v-card class="ma-16" flat>
            <v-card-text><span class="text-h6">Formulario Registro Alumno</span></v-card-text>
            <v-form>
                <v-container class="mt-6" fluid>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field label="Nombre" required></v-text-field>
                        </v-col>
                        <v-col cols="10">
                            <v-text-field label="Apellido" required></v-text-field>
                        </v-col>  
                    </v-row>

                    <v-row>
                        <v-col cols="10">
                            <v-text-field label="Matricula" required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="10">
                            <v-text-field label="Correo" required></v-text-field>
                        </v-col>
                        
                    </v-row>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field label="Contraseña" required></v-text-field>
                        </v-col>
                    </v-row>
                    <!-- <v-row>
                        <v-col cols="10">
                            <v-textarea outlined label="Comentarios y anotaciones">
                            </v-textarea>
                        </v-col>
                    </v-row> 
                    <v-row>
                        <v-col cols="10">
                            <v-select label="Estado de seleccion" required :items="estados"></v-select>
                        </v-col>
                    </v-row>-->
                    <v-row>
                        <v-container class="mt-10">
                            <v-btn>
                                Confirmar
                            </v-btn>
                            <v-btn>
                                Cerrar
                            </v-btn>
                        </v-container>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    <!-- </v-dialog> -->
    </v-row>
</template>


<script>
export default {
    /* data: () => ({
        estados: ['Aprobado', 'Rechazado'],
    }), */
};
</script>
