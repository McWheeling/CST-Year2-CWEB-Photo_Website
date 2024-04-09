/**
 * Appointment Controller
 */
import { Controller } from '../decorator/Controller'
import { AppDataSource } from '../data-source'
import { Appointment } from '../entity/Appointment'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { Route } from '../decorator/Route'
import { NextFunction, Request, Response } from 'express'

@Controller('/appointment')
export default class AppointmentController {
  private readonly appointmentRepository = AppDataSource.getRepository(Appointment)

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
   * GET Handler for all Appointment Entries
   */
  @Route('get')
  async all (req: Request, res: Response, next: NextFunction): Promise<Appointment[]> {
    return await this.appointmentRepository.find()
  }

  /**
   * GET Handler for one specific Appointment Entry
   */
  @Route('get', '/id')
  async one (req: Request, res: Response, next: NextFunction): Promise<Appointment> {
    return await this.appointmentRepository.findOneBy({ id: req.params.id })
  }

  /**
   * POST Handler
   */
  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    const newAppointment = Object.assign(new Appointment(), req.body)
    const violations = await validate(newAppointment, this.validOptions)

    if (violations.length) {
      res.statuscode = 422
      return violations
    } else {
      res.statuscode = 201
      return await this.appointmentRepository.save(newAppointment)
    }
  }

  /**
   * PUT Handler
   */
  @Route('put', '/:id')
  async update (req: Request, res: Response, next: NextFunction): Promise<Appointment | ValidationError[]> {
    const appointmentToUpdate = await this.appointmentRepository.preload(req.body)

    if (!appointmentToUpdate || appointmentToUpdate.id.toString() !== req.params.id) next()
    else {
      const violations = await validate(appointmentToUpdate, this.validOptions)
      if (violations.length) {
        return violations
      } else {
        return await this.appointmentRepository.save(appointmentToUpdate)
      }
    }
  }

  /**
   * DELETE Handler
   */
  @Route('delete', '/:id')
  async delete (req: Request, res: Response, next: NextFunction): Promise<Appointment> {
    const appointmentToRemove = await this.appointmentRepository.findOneBy({ id: req.params.id })
    if (appointmentToRemove) return await this.appointmentRepository.remove(appointmentToRemove)
    else next()
  }
} // End of file
