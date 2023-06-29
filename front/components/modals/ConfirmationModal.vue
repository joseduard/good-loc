<template >
    <div >
        <v-btn @click="dialog=true">{{ name }}
        <v-dialog activator="parent" v-model="dialog" max-width="500px" >
                  <v-card class="container_rent">
                    <v-card-title>Confirmation</v-card-title>
                    <v-card-text>Are you sure ?</v-card-text>
                    <v-card-actions>
                      <v-btn @click="$emit('confirmation');dialog=false">Confirm</v-btn>
                      <v-btn @click="dialog=false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                  </v-dialog>
                </v-btn>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
    props:{
        name: String,
        dialogModal: Boolean,
    }
}
</script>
<style scoped lang="scss">
@import '@/design/_colors';
.container_rent {
  width: 100%;
  height: 100%;
  border: 2px solid $color-primary; 
  border-radius: 5px;
  box-shadow: rgba(255, 129, 2, 0.25) 0px 30px 60px -12px inset, rgba(210, 90, 4, 0.3) 0px 18px 36px -18px inset;
  background-color: black !important;
  
}
</style>