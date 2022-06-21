import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumMembersService } from "../services/AlbumMembersService";



export class AlbumMembersController extends BaseController {
  constructor() {
    super('api/albumMembers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const albumMember = await albumMembersService.joinAlbum(req.body)
      return res.send(albumMember)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await albumMembersService.leaveAlbum(req.params.id, req.userInfo.id)
    } catch (error) {
      next(error)
    }
  }


}


