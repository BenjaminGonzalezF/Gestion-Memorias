<template>
    <v-app>
        <div align="center" class="about2">
            <v-col lass="px-4">
                <h1>
                    Cursos pendientes
                </h1>
                <v-card
                    height="300" width="80%" outlined class="overflow-y-auto" max-height="350"
                >
                <v-col >
                <v-expansion-panels accordion>
                    <v-expansion-panel
                        v-for="ArraySemestres in semestres" :key="ArraySemestres.id"
                    >
                        <v-expansion-panel-header> {{ArraySemestres.nombre}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                    <v-col v-for="ArrayRamos in ArraySemestres.ramos " :key="ArrayRamos.id" col="1">
                        <v-card height="60" width="400">
                        <v-col>
                            <v-row>
                                <v-checkbox
                                    :v-model="ArrayRamos.selected"
                                    @click="agregar(ArrayRamos.name)"
                                ></v-checkbox>
                                <p class="mt-5">
                                    {{ArrayRamos.name}}
                                </p>
                            </v-row>    
                        </v-col>
                        </v-card>
                    </v-col>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                </v-col>
                </v-card>
                <v-col>
                
                </v-col>
                <h1>
                    Información
                </h1>
                <v-card
                height="250" width="80%" 
                >
                    <v-col>
                        <p>
                            Nombre: nombrecompleto
                        </p>
                        <p>
                            Tema: nombretema
                        </p>
                        <p>
                            Profesor Guia: nombre profesor
                        </p>
                        <p>
                        Cursos pendientes {{nocursados}}
                        </p>
                    </v-col>
                    <v-btn>
                        Enviar Solicitud
                    </v-btn> 
                </v-card>
            </v-col>
        </div>
    </v-app>
</template>

<script>
let semestres1= [
        {
            id: 0,
            nombre: "Semestre 1",
            ramos:[
                {
                    name:"Introducción a la ICC",
                    selected: null
                },
                {
                    name:"Introducción a la Programación",
                    selected: null
                },
                {
                    name:"Teoria de Sistema",
                    selected: null
                },
                {
                    name:"Introducción a la Matemática",
                    selected: null
                },
                {
                    name:"Comunicación Oral y Escrita I",
                    selected: null
                },
                {
                    name:"Idioma Extranjero I",
                    selected: null
                }
            ],
        },
        {
            id: 1,
            nombre: "Semestre 2",
            ramos:[
                {
                    name:"Interfaz Humano Computador",
                    selected: null
                },
                {
                    name:"Pensamiento Computacional ",
                    selected: null
                },
                {
                    name:"Algebra",
                    selected: null
                },
                {
                    name:"Cálculo",
                    selected: null
                },
                {
                    name:"Comunicación Oral y Escrita II",
                    selected: null
                },
                {
                    name:"Idioma Extranjero II",
                    selected: null
                },
                {
                    name:"Deportes I",
                    selected: null
                }
            ],
        }, 
    ]
  export default {
    data() {
    return{
        semestres: [],
        nocursados: [],
        };
    },
    created() {
        this.listarZapatillas();
    },
    methods:{
        listarZapatillas(){
            console.log("ddd"+semestres1.length)
            for(var i=0;i<semestres1.length;i++){
                this.semestres.push(semestres1[i])   
                console.log(this.semestres[i].nombre)
            }
        },
        onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
      agregar(nombre){
            var x=0;
            var b=true
            console.log("algo: "+this.nocursados.length)
            if(this.nocursados.length!=0){
                for(var i=0;i<this.nocursados.length;i++){
                    console.log("for: "+this.nocursados[i])
                    console.log("===: "+nombre)
                    if(this.nocursados[i]==nombre){
                        this.nocursados.splice(i,1)
                        console.log("se elimina")
                        console.log("*********************************************************")
                        console.log("sale")
                        b=true
                        break;
                        
                    }else{
                        console.log("sale")
                        b=false
                       
                    }
                }
            }else{
                b=false
            }
            if(!b){
            for(var i=0;i<this.semestres.length;i++){
                console.log("semestre for: "+this.semestres[i].nombre)
                for(var a=0;a<this.semestres[i].ramos.length;a++){
                    console.log("for: "+this.semestres[i].ramos[a].name)
                    console.log("===: "+nombre)
                    if(this.semestres[i].ramos[a].name==nombre){
                        this.nocursados.push(nombre) 
                        console.log("se agrego correctamente+"+this.semestres[i].ramos[a].name)
                        console.log("*********************************************************")
                        x=1;
                        break;
                    }
                       
                }
                if(x==1){
                    x=0
                    break;
                } 

            }
            }
            
        },

    },
    }

</script>