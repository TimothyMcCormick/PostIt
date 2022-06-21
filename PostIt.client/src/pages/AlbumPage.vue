<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      
        <Picture v-for="p in pictures" :key="p.id" :picture="p" />
      
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { picturesService } from "../services/PicturesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  setup(){
    const route = useRoute()

    onMounted(async() =>{
      try {
        await picturesService.getAlbumPictures(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      pictures : computed(() => AppState.pictures)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>