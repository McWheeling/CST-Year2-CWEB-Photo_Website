/**
 * Appointment Entity
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  MaxLength
} from 'class-validator'

const emailOptions = {
  allow_display_name: false,
  ignore_max_length: false,
  allow_ip_domain: false,
  domain_specific_validation: true
}

@Entity()
export class Appointment {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number

  /**
   * First Name
   */
  @Column({ type: 'nvarchar', length: 50, nullable: false })
  @Length(1, 50, { message: 'First Name must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'First Name is Required' })
  firstName: string

  /**
   * Last Name
   */
  @Column({ type: 'nvarchar', length: 50, nullable: false })
  @Length(1, 50, { message: 'Last Name must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'Last Name is Required' })
  lastName: string

  /**
   * Email
   */
  @Column({ type: 'varchar', length: 320, nullable: false })
  @IsEmail(emailOptions, { message: 'Email must be in the proper format' })
  @IsNotEmpty({ message: 'Email is Required' })
  email: string

  /**
   * Phone Number
   */
  @Column({ type: 'varchar', length: 17, nullable: false })
  @Length(7, 17, { message: 'Phone Number must be from $constraint1 to $constraint2 characters' })
  @IsPhoneNumber('CA', { message: 'Phone Number Must be a valid Canadian format' })
  @IsNotEmpty({ message: 'Phone number is Required' })
  phone: string

  /**
   * Address
   */
  @Column({ type: 'varchar', length: 50, nullable: true })
  @MaxLength(50, { message: 'Address can be at most $constraint1 characters ' })
  address: string

  /**
   * Time
   * - In Front End the Time Picker stores it in HH:mm:ss
   */
  @Column({ type: 'datetime' })
  @IsNotEmpty({ message: 'Time is Required' })
  time: string

  /**
   * Date
   * - In Front End the Date Picker stores it in YYYY-MM-DD
   */
  @Column({ type: 'date' })
  @IsDateString()
  @IsNotEmpty({ message: 'Date is Required' })
  date: string

  /**
   * Location Address OPTIONAL
   */
  @Column('varchar', { length: 50, nullable: true })
  @MaxLength(50, { message: 'Location Address can be at most $constraint1 characters ' })
  @IsOptional()
  locationAddress: string

  /**
   * Confirmed - BOOLEAN
   * - True if confirmed, false if not confirmed or while booking
   */
  @Column({ type: 'boolean', nullable: false })
  confirmed: boolean

  /**
   * Description
   */
  @Column({ type: 'nvarchar', length: 500 })
  @IsNotEmpty({ message: 'Description is Required' })
  description: string

  // /**
  // * Role
  // * - String that is either Client, or Staff
  // */
  // @Column({ type: 'varchar', length: 20, nullable: false })
  // @IsOptional()
  // @MaxLength(20, { message: 'Role must be ast most $constraint1 or $constraint2' })
  // @IsIn(['client', 'staff'])
  //   role: string
}
