import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




class PicturesService{

  async getAlbumPictures(albumId){
    let pictures = await dbContext.Pictures.find({albumId})
    return pictures
  }
  async create(body){
    const picture = await dbContext.Pictures.create(body)
    await picture.populate('creator', 'name picture')
    return picture
  }

  async delete(id, userId) {
    const picture = await dbContext.Pictures.findById(id)
    if(picture.creatorId.toString() != userId){
      throw new Forbidden('not authorized to delete')
    }
    await picture.remove()
    return 'deleted'
  }
}


export const picturesService = new PicturesService()