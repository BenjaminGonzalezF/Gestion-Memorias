<template>
  <nav>
    <v-navigation-drawer right app v-model="drawer" color= "rgb(0, 204, 255)">

      <v-layout column class="text-center">
        <v-flex class="mt-6">
          <v-avatar size="150">
            <img src="@/assets/bateman.jpg" />
          </v-avatar>
          <p class="white--text subheading-1 text-weight-bold mt-2">
            Patrick Bateman
          </p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item-group>
          <v-list-item
          v-for="(link, key) in links"
          :key="key"
          link
          @click="cerrarsesion(link.text)"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                link.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat app color= "rgb(0, 204, 255)">
      <v-img max-height="40" max-width="50" src="@/assets/utal.png" >
        
      </v-img>
      <v-app-bar-nav-icon right absolute class="grey--text" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Solicitudes', route: '/Profesor/Solicitudes' },
        {
          icon: 'mdi-folder-heart',
          text: 'Mis proyectos',
          route: '/Profesor/Proyectos',
        },
        { icon: 'mdi-account-group', text: 'Estudiantes', route: '/Profesor/Estudiantes' },
        {icon: 'mdi-location-exit', text: 'Cerrar sesion', route: '/'}
      ],
    }
  },
  methods:{
    cerrarsesion(ref) {
      if (ref == "Cerrar sesion") {
        localStorage.clear()
        this.$router.push({ path: "/" })
      }
    }
  }
}
</script>