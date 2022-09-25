import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class JobsService {
  async createJob(formData) {
    const job = await dbContext.Jobs.create(formData)
    return job
  }
  async getJob(jobId) {
    const job = await dbContext.Jobs.find(jobId).populate('employer', 'company jobtitle')
    if (!job) {
      throw new BadRequest('Invalid Job Id')
    }
    return job
  }
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }



}
export const jobsService = new JobsService()