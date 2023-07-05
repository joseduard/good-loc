<template>
  <v-row>
    <v-col  sm="12">
      <h1 class="fw-400 mb-4 primary--text">Mes Messages</h1>
      <v-list>
        <v-list-item >
          <v-autocomplete
            v-model="pseudo"
            label="Pseudo"
            :items="pseudoList"
            item-text="name"
            @change="$emit('pseudo', {pseudo})"
          ></v-autocomplete>
        </v-list-item>
      </v-list>
      <v-list >
        <div v-for="(message,index) in messages" :key="index">
          <div v-if="pseudo==message.sender.pseudo || pseudo==message.receiver.pseudo">
            <v-row>
              <v-col sm="12" md="11">
                <v-list-item  id="messageSent" v-if="message.sender_id==$auth.$storage.getUniversal('user').id" >
                  <!-- <v-img :src="message.sender.img"> -->
                  <v-col sm="1" md="1">
                    <v-img src="https://i.imgur.com/mJboO28.png"
                      :max-width="50" 
                      :height="50"
                    ></v-img>
                  </v-col>
                  <v-col sm="11" md="10">
                    {{message.message_content}}  
                  </v-col>     
                  <v-btn icon class="close-button" @click="$emit('deleteThis',message.id )">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item>
              </v-col>
            </v-row>
            <v-list-item id="response" v-if="message.sender_id!==$auth.$storage.getUniversal('user').id" >
              <v-col sm="11" md="11">
                {{message.message_content}}
              </v-col>
              <v-col sm="1" md="1">
                <!-- <v-img :src="message.receiver.img"> -->
                  <v-img src="https://i.imgur.com/mJboO28.png"
                    :max-width="50" 
                    :height="50"
                    aspect-ratio="4/3"
                ></v-img>
              </v-col>
            </v-list-item>
          </div>
        </div>
      </v-list>
    </v-col>
  </v-row>          
</template>
  
<script>
  
  export default {
    name: 'MessagesPage',
    props: {
      pseudoList: {
        type: Array,
        required: true,
      },
      messages: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        pseudo: null,
      }
    },
    mounted() {
        // this.$axios.get('api/user/account/message/list/'+this.$auth.$storage.getUniversal('user').id)
        // .then((response) => {
        //   this.messages = response.data
        //   this.pseudoList= response.data.map((message) => {
        //     if(message.sender_id!==this.$auth.$storage.getUniversal('user').id){
        //     return message.sender.pseudo
        // }else{
        //     return message.receiver.pseudo
        //   }
        // },
        // )})
    },
    methods: {
    },
  }
</script>
  
<style lang="scss" scoped>
  @import '@/design/_colors';

  #messageSent{
    color: black;
    background-color: $color-tertiary;
    margin-right: 50%;
    border-radius: 0% 20px 20px 0%;
}
  #response{
    color: white;
    background-color: $color-primary;
    margin-left: 50%;
    border-radius: 20px 0% 0% 20px;
  }
</style>