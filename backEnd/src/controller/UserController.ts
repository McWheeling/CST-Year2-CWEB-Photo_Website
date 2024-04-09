/**
 * User Controller
 */
import { Controller } from '../decorator/Controller'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { Route } from '../decorator/Route'
import { NextFunction, Request, Response } from 'express'

@Controller('/user')
export default class UserController {
  private readonly userRepository = AppDataSource.getRepository(User)

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
  * GET Handler for all Users Entries
  * - Check with group, do I need to have this GET be for only Staff Roles?
  */
  @Route('get')
  async all (req: Request, res: Response, next: NextFunction): Promise<User[]> {
    return await this.userRepository.find()
  }

  /**
  * GET Handler for one specific User Entry
  */
  @Route('get', '/:id')
  async one (req: Request, res: Response, next: NextFunction): Promise<User> {
    return await this.userRepository.findOneBy({ id: req.params.id })
  }

  /**
  * POST Handler
  */
  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    const newUser = Object.assign(new User(), req.body)
    const violations = await validate(newUser, this.validOptions)

    if (violations.length) {
      res.statuscode = 422
      return violations
    } else {
      res.statuscode = 201
      return await this.userRepository.save(newUser)
    }
  }

  /**
  * PUT Handler
  *
  * A user can ONLY update their own profile / id - check if the UUID matches before allowing
  */
  @Route('put', '/:id')
  async update (req: Request, res: Response, next: NextFunction): Promise<User | ValidationError[] | Number> {
    const userToUpdate = await this.userRepository.preload(req.body)
    // Trying to make it so that if the UUID does not equal the UUID in the URL bar then access denied
    if (userToUpdate.id !== req.params.id) {
      // eslint-disable-next-line no-return-assign
      return res.sendStatus(403) // = 403 // Access denied Forbidden
    } else {
      if (!userToUpdate || userToUpdate.id.toString() !== req.params.id) next()
      else {
        const violations = await validate(userToUpdate, this.validOptions)
        if (violations.length) {
          return violations
        } else {
          return await this.userRepository.save(userToUpdate)
        }
      }
    }
  }

  /**
  * DELETE Handler
  */
  @Route('delete', '/:id')
  async delete (req: Request, res: Response, next: NextFunction): Promise<User> {
    const userToRemove = await this.userRepository.findOneBy({ id: req.params.id })
    if (userToRemove) return await this.userRepository.remove(userToRemove)
    else next()
  }
} // End of file
