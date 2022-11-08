<template> 
    <div class=""> 
        <v-app-bar  
            color="#00CCFF" 
        >    
            <v-img 
                max-height="40" 
                max-width="50" 
                src="@/assets/utal.png"   
            ></v-img> 
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
             
        </v-app-bar> 
        <v-navigation-drawer v-model="drawer" absolute temporary color="#00CCFF"> 
            <v-list-item> 
            <v-list-item-avatar> 
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img> 
            </v-list-item-avatar> 
             
            <v-list-item-content> 
                <v-list-item-title>John Leider</v-list-item-title> 
            </v-list-item-content> 
            </v-list-item> 
 
            <v-divider></v-divider> 
 
            <v-list dense> 
            <v-list-item v-for="item in items" :key="item.title" :to="item.route" link @click="cerrarsesion(item.title)"> 
                <v-list-item-icon> 
                    <v-icon>{{ item.icon }}</v-icon> 
                </v-list-item-icon> 
 
                <v-list-item-content> 
                    <v-list-item-title >{{ item.title }}</v-list-item-title> 
                </v-list-item-content> 
            </v-list-item> 
            </v-list> 
        </v-navigation-drawer>   
 
    </div> 
     
</template> 
 
<script> 
    export default{ 
        data(){ 
            return{ 
                drawer: null, 
                items: [
                { title: "Oferta temas", route: '/Alumno', icon: "mdi-folder" },
                { title: "Solicitud de temas", route: '/solicitudTemas', icon: "mdi-folder" },
                { title: "Cerrar sesion", icon: "mdi-forum" },
            ],
                hover: "red" 
            } 
        },
        methods: {
            cerrarsesion(ref){
                if(ref=="Cerrar sesion"){
                    if (this.$route.path !== "/Alumno"||this.$route.path !== "/solicitudTemas") {
                        localStorage.clear();
                        this.$router.push({ path: "/" })
                    }
                    console.log("3")
                }
            }
       }
    }
 
</script> 
 
<style> 
    .v-list-item:hover { 
        background: #FF0182; 
    } 
</style>