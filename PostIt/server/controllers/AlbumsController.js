import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";




export class AlbumsController extends BaseController{
  
  constructor(){
    super('api/albums')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getById)
    .get('/:id/pictures', this.getPictures)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .put('/:id', this.edit)
    .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const albums = await albumsService.getAll()
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const album = await albumsService.getById(req.params.id)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const album = await albumsService.create(req.body)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await albumsService.update(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await albumsService.delete(req.params.id, req.userInfo.id)
      return res.send({message: 'deleted album'})
    } catch (error) {
      next(error)
    }
  }

  async getPictures(req, res, next) {
    try {
      const pictures = await picturesService.getAlbumPictures(req.params.id)
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }
}