import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService";
import BaseController from "../utils/BaseController";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('', this.getJob)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getJob(req, res, next) {
    try {
      const job = await jobsService.getJob(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async createJob(req, res, next) {
    try {
      const formData = req.formData
      formData.employerId = req.userInfo.id
      const job = await jobsService.createJob(formData)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
}