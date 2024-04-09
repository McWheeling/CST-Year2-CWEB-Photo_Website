/**
 * Location Controller
 */
import { Controller } from '../decorator/Controller'
import { AppDataSource } from '../data-source'
import { Location } from '../entity/Location'
import { Route } from '../decorator/Route'
import { NextFunction, Request, Response } from 'express'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'

@Controller('/location')
export default class LocationController {
  private readonly locationRepository = AppDataSource.getRepository(Location)

  /**
   * Validator Options
   * https://github.com/typestack/class-validator#passing-options
   */
  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: { target: false, value: false }
  }

  /**
  * GET Handler for all Locations Entries
  */
  @Route('get')
  async all (req: Request, res: Response, next: NextFunction): Promise<Location[]> {
    return await this.locationRepository.find()
  }

  // One Specific - Initially looking at UserController, but might need more specific Student Controller one
  /**
  * GET Handler for one specific Location Entry
  */
  @Route('get', '/:id')
  async one (req: Request, res: Response, next: NextFunction): Promise<Location> {
    return await this.locationRepository.findOneBy({ id: req.params.id })
  }

  /**
  * POST Handler
  */
  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    const newLocation = Object.assign(new Location(), req.body)
    const violations = await validate(newLocation, this.validOptions)

    if (violations.length) {
      res.statuscode = 422
      return violations
    } else {
      res.statuscode = 201
      return await this.locationRepository.save(newLocation)
    }
  }

  /**
  * PUT Handler
  */
  @Route('put', '/:id')
  async update (req: Request, res: Response, next: NextFunction): Promise<Location | ValidationError[]> {
    const locationToUpdate = await this.locationRepository.preload(req.body)

    if (!locationToUpdate || locationToUpdate.id.toString() !== req.params.id) next()
    else {
      const violations = await validate(locationToUpdate, this.validOptions)
      if (violations.length) {
        return violations
      } else {
        return await this.locationRepository.save(locationToUpdate)
      }
    }
  }

  /**
  * DELETE Handler
  */
  @Route('delete', '/:id')
  async delete (req: Request, res: Response, next: NextFunction): Promise<Location> {
    const locationToRemove = await this.locationRepository.findOneBy({ id: req.params.id })
    if (locationToRemove) return await this.locationRepository.remove(locationToRemove)
    else next()
  }
} // End of file
