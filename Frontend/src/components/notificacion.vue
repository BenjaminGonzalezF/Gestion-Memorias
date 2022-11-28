<template>
    <v-menu transition="slide-y-transition" max-width="40%">
        <v-spacer></v-spacer>
        <template v-slot:activator="{ on, attrs }">
            <v-btn fab class="" color="rgb(0, 204, 255)" dark v-bind="attrs" v-on="on" small @click="verNotificaciones()">
                <v-icon>mdi-bell</v-icon>
                <v-badge color="pink" :content="cantidad_notificaciones" v-if="cantidad_notificaciones > 0"></v-badge>
            </v-btn>
        </template>
        <v-card class="overflow-y-auto" height="400" width="100%" color="white">
            <v-banner class="justify-center text-h5 white--text" sticky color="rgb(0, 204, 255)">
                <h4 class="mr-4">Notificaciones</h4>
            </v-banner>
            <v-card-text v-for="(item, i) in notificaciones" :key="i">
                <div>{{ item.notificacion }}</div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>
<script>
export default {
    data: () => ({
        notificaciones:[],
        cantidad_notificaciones: 0,
    }),
    created() {
        this.cargar_notificaciones()
    },
    methods: {
        ordenarNotificaciones() {
            var notificacion_ordenadas = []
            for (var i = (this.notificaciones.length - 1); i >= 0; i--) {
                notificacion_ordenadas.push({
                    notificacion: this.notificaciones[i].notificacion
                })
                this.cantidad_notificaciones++
            }
            this.notificaciones = notificacion_ordenadas
        },
        cargar_notificaciones(){
            this.axios.get("todos_notificaciones").then((respN)=>{
                this.notificaciones = respN.data
                this.notificaciones = this.notificaciones.filter(n=> n.id_ref==localStorage.getItem("key_user"))
                this.ordenarNotificaciones()
            })
        },
        verNotificaciones() {
            // Actualizar en la bd -pendiente
            this.cantidad_notificaciones = 0
        }
    }
}
</script>
