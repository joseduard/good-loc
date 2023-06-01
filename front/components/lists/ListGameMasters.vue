<template >
    <div id="all">
        <ModalGameMasterList v-if="dialogModal" :dialogModal="dialogModal" :gameMaster="gameMaster" />
        <v-row>
            <v-col v-for="gameMasterAtm in gameMasters" :key="gameMasterAtm.id" cols="12" md="2" lg="3" >
                <div @click="dialogModal = !dialogModal;gameMaster=gameMasterAtm">
                <CardGameMaster :gameMaster="gameMasterAtm" />
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import CardGameMaster from '~/components/CardGameMaster.vue'
import ModalGameMasterList from '~/components/modals/ModalGameMasterList.vue'
export default {
    name: 'ListGameMasters',
    components: {
        CardGameMaster,
        ModalGameMasterList
    },
    data() {
        return {
            dialogModal: false,
            game: {
                name: "Jeu de 1",
                description: "Excepteur tempor magna dolor tempor.",
            },
            gameMasters: [{
              name: "Jeu de 2",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },
          {
              name: "Jeu de 3",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },
          {
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },{
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },{
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },{
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },
          {
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },
          {
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },{
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          },{
              name: "Jeu de rôle",
              presentation: "Excepteur tempor magna dolor tempor.",
              presentationBtn: "Trouver un jeu"
          }],
        }
    },

}
</script>