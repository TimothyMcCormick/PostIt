import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";

// whats the difference between PostIt.client and PostIt???


export class PicturesController extends BaseController{
  constructor() {
    super('api/pictures')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const picture = await picturesService.create(req.body)
      return res.send(picture)
    } catch (error) {
      next(error)
    }
    
  }

  async delete(req, res, next) {
    try {
      const message = await picturesService.delete(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

}