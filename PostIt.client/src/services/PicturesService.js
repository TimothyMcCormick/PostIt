import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PicturesService{

async getAlbumPictures(albumId){
const res = await api.get(`api/albums/${albumId}/pictures`) 
logger.log(res.data)
AppState.pictures = res.data


}

}

export const picturesService = new PicturesService()