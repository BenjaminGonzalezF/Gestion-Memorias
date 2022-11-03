<template>
    <v-app>
        <div align="center" class="about2">
            <v-col lass="px-4">
            
            <h1>
                Cursos pendientes
            </h1>
            <v-card
                height="250" width="80%" outlined class="overflow-y-auto" max-height="240"
            >
              <v-col>
                  <v-card>
                      <h3>
                          Semestre 9
                      </h3>
                      <v-card
                      height="40%" width="95%"
                      >
                          <v-col>
                          <v-checkbox
                          label="Taller de Desarrollo de Software"
                          > 
                          </v-checkbox>
                          <v-checkbox
                          label="Seguridad informatica"
                          > 
                          </v-checkbox>
                          <v-checkbox
                          label="Electivo II"
                          > 
                          </v-checkbox>
                          <v-checkbox
                          label="Gestión de Proyectos Tecnológicos"
                          > 
                          </v-checkbox>
                          <v-checkbox
                          label="Gestión de Recursos Humanos"
                          > 
                          </v-checkbox>
                          </v-col>
                      </v-card>
                      <h3>
                          Semestre 10
                      </h3>
                      <v-card
                      height="40%" width="95%" max-height="450"
                      >
                          <v-col>
                          <v-checkbox
                          label="Formulación de Proyecto de Titulación"
                          > 
                          </v-checkbox>
                          <v-checkbox
                          label="Electivo III"
                          > 
                          </v-checkbox>
                          <v-checkbox
                          label="Gestion de Inovación y Emprendimiento"
                          > 
                          </v-checkbox>
                          </v-col>
                      </v-card>
                      <h3>
                          Semestre 11
                      </h3>
                      <v-card
                      height="40%" width="95%" max-height="450"
                      >
                          <v-col>
                          <v-checkbox
                          label="Proyecto de Titulación"
                          > 
                          </v-checkbox>
                          <v-checkbox
                          label="Electivo IV"
                          > 
                          </v-checkbox>
                          </v-col>
                      </v-card>
                    
                  </v-card>
                  
              </v-col>
             
            </v-card>
            <v-col>
            
            </v-col>
            
            <v-row
                align="center"
                justify="space-around"
            >
        
            <v-btn>Editar datos</v-btn>
            <v-btn>Guardar datos</v-btn>
            </v-row>

          
                
           
       
            <h1>
                Información
            </h1>
            <v-card
              height="200" width="80%" 
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
            </v-col>
              <v-btn>Enviar Solicitud</v-btn> 
            </v-card>
             
          </v-col>
        </div>
    </v-app>
</template>

<script>

</script>