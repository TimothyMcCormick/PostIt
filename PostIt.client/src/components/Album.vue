<template>
  <div class="component">

    <div class="col-md-3 elevation-2 rounded bg-white m-2">
          <img class="img-fluid" :src="album.coverImg" alt="" @click="selectAlbum">
        </div>

  </div>
</template>


<script>
import { useRoute, useRouter } from "vue-router"
export default {
  props: {album: {type: Object, required: true}},
  setup(props){
    const router = useRouter()
    return {
      selectAlbum(){
        router.push({ name: "Album", params: {id: props.album.id}})
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>