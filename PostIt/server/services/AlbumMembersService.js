import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




class AlbumMembersService {
  async getMemberAlbums(accountId) {
    const memberAlbums = await dbContext.AlbumMembers.find(accountId).populate('album')
    return memberAlbums
  }

  async getAll(albumId) {
    const albumMembers = await dbContext.AlbumMembers.findById(albumId)
    return albumMembers
  }

  async getAccountAlbumMember(accountId, albumId) {
    const albumMember = await dbContext.AlbumMembers.findOne({ albumId, accountId })
      .populate('account', 'name picture')
      .populate('album')
    return albumMember

  }

  async getById(id) {
    const albumMember = await dbContext.AlbumMembers.findById(id)
    if (!albumMember) {
      throw new BadRequest('Invalid Id')
    }
    return albumMember
  }

  async joinAlbum(albumMemberData) {
    const isMember = await this.getAccountAlbumMember(albumMemberData.accountId, albumMemberData.albumId)
    if (isMember) {
      throw new BadRequest('You are already a Member')
    }
    const albumMember = await dbContext.AlbumMembers.create(albumMemberData)
    await albumMember.populate('album')
    await albumMember.populate('account')
    return albumMember
  }

  async leaveAlbum(id, userId) {
    const albumMember = await this.getById(id)
    if (albumMember.accountId.toString() != userId) {
      throw new Forbidden('cannot remove member')
    }
    return albumMember.remove()
  }

}


export const albumMembersService = new AlbumMembersService()