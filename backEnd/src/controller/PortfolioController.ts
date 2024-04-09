import { AppDataSource } from '../data-source'
import { Portfolio } from '../entity/Portfolio'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidatorOptions } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

@Controller('/portfolio')
export default class PortfolioController {
  private readonly portfolioRepo = AppDataSource.getRepository(Portfolio)

  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: { target: false, value: false }
  }

  @Route('get')
  async read (req: Request, res: Response, next: NextFunction): Promise<Portfolio | Portfolio[]> {
    return await this.portfolioRepo.find()
  }

  @Route('delete', '/:id')
  async remove (req: Request, res: Response, next: NextFunction): Promise<Portfolio> {
    const urlID = req.params.id
    try {
      if (urlID) {
        const portfolioToRemove = await this.portfolioRepo.findOneBy({ id: urlID })
        res.statusCode = 'No Content'
        return await this.portfolioRepo.remove(portfolioToRemove)
      } else {
        res.statuscode = 422
        return res.statuscode
      }
    } catch {
      return next
    }
  }

  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    const newPortfolio = Object.assign(new Portfolio(), req.body)
    const violations = await validate(newPortfolio, this.validOptions)

    if (violations.length) {
      res.statuscode = 422
      return violations
    } else {
      res.statuscode = 201
      return await this.portfolioRepo.save(newPortfolio)
    }
  }
}
