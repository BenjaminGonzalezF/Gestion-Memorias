<template>
    <v-row justify="center">
        <v-progress-circular :size="20" color="#FF0182" indeterminate v-if="this.$store.state.loading">
        </v-progress-circular>
        <v-dialog v-model="dialog" max-width="400px"
            v-if="!this.$store.state.loading && this.$store.state.roles.length >= 2">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" color="#FF0182" depressed small dark>
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
                                <v-select v-model="select" :items="this.$store.state.roles" label="Roles" outlined>
                                </v-select>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green accent-3" dark @click="cambiarRol()"> Guardar </v-btn>
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
            dialog: false,
            select: null,
            roles: [
                'Comite', 'Director', 'Profesor','Memorista'
            ]
        }
    },
    methods: {
        cambiarRol() {
            this.axios.get("todos_usuarios").then((respU) => {
                var usuarios = respU.data
                usuarios = usuarios.filter(u => u._id == localStorage.getItem("key_user"))
                usuarios[0].rolActivo = this.select
                this.axios.put(`/usuario_ac/${usuarios[0]._id}`, usuarios[0])
                    .then((response) => {
                        this.$store.state.loading = true
                        this.$store.commit('cargar_datos')
                    })
            })
        }
    }
}

</script>
