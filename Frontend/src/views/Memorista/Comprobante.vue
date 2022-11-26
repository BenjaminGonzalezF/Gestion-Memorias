<template>
    <div>
        <div class="elementos">
            <div class="elemento1">
                <div class="caja">
                    <div class="columnas">
                        <b>Su tema ha sido aprobado con exito</b>
                    </div>
                    <v-img class="columnas espacio" max-height="50" max-width="40" height="auto" width="auto"
                        src="@/assets/check.png"></v-img>
                </div>
                <div class="boton">
                    <v-btn color = pink v-on:click="createPDF()">PDF<v-img max-height="20" max-width="20"
                            height="5%" width="auto" src="@/assets/download.png"></v-img>
                    </v-btn>
                </div>
            </div>
            <div class="elemento2">
                <h2>Información</h2>
                <div class="caja2">
                    <div>
                        <p>Nombre tema: {{tema.nombre}}</p>
                        <p>Descripción: {{tema.descripcion}}</p>
                        <p>Profesor asignado: FALTA</p>
                        <p v-for="(participante,index) in participantes"  :key="participante.id">Alumno {{index+1}}: {{participante}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import headerProfe from '@/components/headerProfe.vue'
import jsPDF from 'jspdf'

export default {
    components: { headerProfe },
    data() {
        return {
            idTema: "",
            tema: { },
            participantes: [],
        }
    },
    created() {
        this.idTema = this.$route.params.id;
        this.obtenerTema(this.idTema);
    },
    methods: {
        obtenerTema(temaId){
            this.axios.get('tema/'+temaId).then((response) => {
                this.tema = response.data;
                this.tema.postulantes.forEach(element => {
                    console.log(element);
                    this.participantes.push(element.nombre);
                });
                
            });
            
        },
        createPDF() {
            var pdf = new jsPDF('p', 'mm', 'letter');
            var strArr = pdf.splitTextToSize(this.tema['descripcion'], 195)
            pdf.setFontSize(22);
            pdf.setFontSize(16);

            var img = new Image;
            var img2 = new Image;

            img.onload = function () {
                pdf.addImage(this, 10, 10, 25, 25);
            };

            img2.onload = function () {
                pdf.addImage(this, 125, 10, 70, 25);
                pdf.save("Documento Acreditación.pdf");
            };

            img.crossOrigin = "";
            img.src = "//i.imgur.com/Hjs2ccm.png";
            img2.src = "//i.imgur.com/gopDy9Y.png";
            
            var participantes = pdf.splitTextToSize("El siguiente documento acredita que, " + this.participantes + " puede comenzar a realizar su trabajo de tesis.", 190)
            pdf.text(13, 80,participantes);
            pdf.text(13, 140, "INFORMACIÓN:");
            pdf.text(13, 141, "_____________");
            pdf.text(13, 155, "Nombre del tema: " + this.tema['nombre']);
            pdf.text(13, 165, "Profesor guía: " + this.tema['Profesor Guía']);
            pdf.text(13,175,strArr)
        }
    }
}
</script>

<style>
.elementos {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.caja2 {
    border: 3px solid black;
}

.elemento1 {
    display: flex;
    gap: 7%;
    width: 60%;
}

.elemento2 {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 60%;
}

.caja {
    height: 70px;
    border: 3px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.columnas {
    display: inline-block;
}

.espacio {
    margin-left: 10px;
}

.boton {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
}
</style>