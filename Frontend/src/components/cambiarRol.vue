<template>
    <v-row justify = "center">
        <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on, attrs }" >
                <v-btn v-bind="attrs" v-on="on" color="#FF0182" depressed small dark @click="cambiarRol()">
                Cambiar de rol
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">Seleccione un rol</span>
                </v-card-title>
                <v-form class="px-3 pb-3" ref="form">
                    <v-card-text>
                        <v-container>
                        <v-row>
                            <v-select :items="roles" label="Roles" outlined >
                            </v-select>
                        </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green accent-3" dark @click="submit"> Guardar </v-btn>
                        <v-btn color="grey" text @click="dialog = false"> Rechazar </v-btn>                        
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
  data() {
    return {
        dialog : false,
        roles:[
            'Comite','Director','Profesor'
        ]
    }
  },
  methods:{
    cambiarRol(){
      
    }
  }
}

</script>
