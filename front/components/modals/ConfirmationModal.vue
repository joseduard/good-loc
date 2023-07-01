<template>
  <div>
    <v-btn @click="dialog = true"
      >{{ name }}
      <v-dialog v-model="dialog" activator="parent" max-width="500px">
        <v-card class="container_rent align-center">

          <v-card-title>Confirmation</v-card-title>
          <v-card-text><p>
            {{ nameDate }}</p>
          <v-date-picker v-model="picker" @change="$emit('dateSelected',picker)"></v-date-picker>
</v-card-text>
          <v-card-actions>
            <v-btn
              @click="
                
                $emit('confirmation', picker)
                dialog = false
              "
              >Confirm</v-btn
            >
            <v-btn @click="dialog = false">Cancel</v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    dialogModal: Boolean,
    nameDate: String,
  },
  data() {
    return {
      dialog: false,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/design/_colors';
.container_rent {
  max-width: 375px;
  width: 100%;
  height: 100%;
  border: 2px solid $color-primary;
  border-radius: 5px;
  box-shadow: rgba(255, 129, 2, 0.25) 0px 30px 60px -12px inset,
    rgba(210, 90, 4, 0.3) 0px 18px 36px -18px inset;
  background-color: black !important;
}
</style>
