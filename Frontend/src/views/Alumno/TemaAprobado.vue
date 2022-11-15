<template>
    <div>
        <header-profe></header-profe>
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
                    <v-btn v-on:click="createPDF()">Descarga el documento<v-img max-height="20" max-width="20"
                            height="5%" width="auto" src="@/assets/download.png"></v-img>
                    </v-btn>
                </div>
            </div>
            <div class="elemento2">
                <h2>Información</h2>
                <div class="caja2">
                    <div v-for="(tema, index) in tema" :key="index">
                        <p>{{ index }} : {{ tema }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import headerProfe from '@/components/headerProfe.vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

export default {
    components: { headerProfe },
    data() {
        return {
            idTema: "",
            tema: { "Nombre Alumno": "Fernando Gonzalez", "Nombre del tema": "Ejemplo proyecto 2", "Profesor Guía": "Rodrigo Pavez", "Detalles del tema": "Gloria trevi se caso con maluma" },
        }
    },
    created() {
        this.idTema = this.$route.params.id;
    },
    methods: {
        createPDF() {
            var pdf = new jsPDF('p', 'mm', 'letter');
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

            pdf.text(13, 80, "El siguiente documento acredita que, " + this.tema['Nombre Alumno'] + " puede comenzar");
            pdf.text(13, 90, "a realizar su trabajo de tesis.");
            pdf.text(13, 140, "INFORMACIÓN:");
            pdf.text(13, 141, "_____________");
            pdf.text(13, 155, "Nombre del tema: " + this.tema['Nombre del tema']);
            pdf.text(13, 165, "Profesor guía: " + this.tema['Profesor Guía']);
            pdf.text(13, 175, "Detalles del tema: " + this.tema['Detalles del tema']);
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