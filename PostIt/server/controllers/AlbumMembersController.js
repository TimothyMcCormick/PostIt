import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";



export class AlbumMembersController extends BaseController{
  constructor(){
    super('api/albumMembers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
  }
}