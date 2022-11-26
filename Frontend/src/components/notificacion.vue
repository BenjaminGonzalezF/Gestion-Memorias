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
            <v-card-text v-for="(item, i) in items" :key="i">
                <div>{{ item.title }}</div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>
<script>
export default {
    data: () => ({
        items: [
            { title: 'Notificacion 1' },
            { title: 'Notificacion 2' },
            { title: 'Notificacion 3' },
            { title: 'Notificacion 4' },
            { title: 'Notificacion 5' },
            { title: 'Notificacion 6' },
            { title: 'Notificacion 7' },
            { title: 'Notificacion 8' },
            { title: 'Notificacion 9' },
            { title: 'Notificacion 10' },
            { title: 'Notificacion 11' },
            { title: 'Notificacion 12' },
            { title: 'Notificacion 13' },
            { title: 'Notificacion 14' },
            { title: 'Notificacion 15' },
            { title: 'Notificacion 16' },
        ],
        cantidad_notificaciones: 0,
    }),
    created() {
        this.ordenarNotificaciones()
    },
    methods: {
        ordenarNotificaciones() {
            var items_ordenados = []
            for (var i = (this.items.length - 1); i >= 0; i--) {
                items_ordenados.push({
                    title: this.items[i].title
                })
                this.cantidad_notificaciones++
            }
            this.items = items_ordenados
        },
        verNotificaciones() {
            this.cantidad_notificaciones = 0
        }
    }
}
</script>
