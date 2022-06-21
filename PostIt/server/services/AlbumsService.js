import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




class AlbumsService{
  
  async getAll() {
    const albums = await dbContext.Albums.find()
    return albums
  }

  async getById(id) {
    const album = await dbContext.Albums.findById(id).populate('creator', 'name picture')
    if(!album){
      throw new BadRequest('invalid id')
    }
    return album
  }

  async create(body) {
    const album = await dbContext.Albums.create(body)
    return album
  }

  async update(update) {
    const original = await this.getById(update.id)
    if(original.creatorId.toString() != update.creatorId){
      throw new Forbidden('not your album')
    }
    original.name = update.name || original.name
    original.coverImg = update.coverImg || original.coverImg

    await original.save()
    return original
  }

  async delete(albumId, userId) {
    const album = await this.getById(albumId)
    if(album.creatorId.toString() != userId){
      throw new Forbidden('not your album to delete')
    }
    await album.remove()
  }

}


export const albumsService = new AlbumsService()