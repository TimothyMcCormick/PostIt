import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { albumMembersService } from "../services/AlbumMembersService"
import { albumsService } from "../services/AlbumsService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/albums', this.getAlbums)
      .get('/memberAlbums', this.getMemberAlbums)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAlbums(req, res, next) {
    try {
      const albums = await albumsService.getAll({ creatorId: req.userInfo.id })
      return res.send(albums)
    } catch (error) {
      next(error)
    }

  }

  async getMemberAlbums(req, res, next) {
    try {
      const userInfo = req.userInfo
      const memberAlbums = await albumMembersService.getMemberAlbums(userInfo.id)
      return res.send(memberAlbums)
    } catch (error) {
      next(error)
    }

  }
}

