<template>
  <div class="component">

    <div class="col-md-3 elevation-2 rounded bg-white m-2">
          <img class="img-fluid" :src="picture.imgUrl" alt="">
        </div>

  </div>
</template>


<script>
import { onMounted } from "@vue/runtime-core"
import {picturesService} from "../services/PicturesService"
import { useRoute } from "vue-router"
export default {
  props: {picture: {type: Object, required: true}},
  
  setup(){


    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>