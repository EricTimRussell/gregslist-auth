import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";

export class HousesController extends BaseController {

  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouse)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.buildHouse)
      .delete('/:houseId', this.deleteHouse)
      .put('/:id', this.editHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouse(req, res, next) {
    try {
      const house = await housesService.getHouse(req.params.houseId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async buildHouse(req, res, next) {
    try {
      const formData = req.body
      formData.sellerId = req.userInfo.id
      const house = await housesService.buildHouse(formData)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async deleteHouse(req, res, next) {
    try {
      const car = await housesService.deleteHouse(req.params, req.userInfo)
      res.send("Home Deleted")
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const house = await housesService.editHouse(req.params, req.userInfo)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

}