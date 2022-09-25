import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors"

class HousesService {
  async editHouse(houseData, userInfo) {
    const house = await this.getHouse(houseData.id)
    if (userInfo.Id != house.sellerId.toString()) {
      throw new Forbidden('Cannot edit another persons house')
    }
    house.bedrooms = houseData.make || house.bedrooms
    house.bathrooms = houseData.model || house.bathrooms
    house.levels = houseData.levels || house.levels
    house.price = houseData.price || house.price
    house.year = houseData.year || house.year
    house.imgUrl = houseData.imgUrl || house.imgUrl
    house.description = houseData.description || house.description

    await house.save()
    return house
  }
  async getHouse(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('seller', 'name picture price')
    if (!house) {
      throw new BadRequest('Wrong Id')
    }
    return house
  }
  async deleteHouse(houseData, userInfo) {
    const house = await this.getHouse(houseData.houseId)
    if (userInfo.id != house.sellerId.toString()) {
      throw new UnAuthorized('Not allowed to remove listing')
    }
    await dbContext.Houses.findByIdAndDelete(houseData.houseId)
  }
  async buildHouse(formData) {
    const house = await dbContext.Houses.create(formData)
    return house
  }

  async getHouses() {
    const houses = await dbContext.Houses.find()

    return houses
  }




}
export const housesService = new HousesService()