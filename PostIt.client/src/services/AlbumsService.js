import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class AlbumsService{
    async getAlbums(){
      const res = await api.get('api/albums')
      logger.log(res.data)
      AppState.albums = res.data
    }
}


export const albumsService = new AlbumsService()