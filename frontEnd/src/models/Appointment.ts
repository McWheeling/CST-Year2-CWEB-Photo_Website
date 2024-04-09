/**
 * Appointment Model Entity File
 */
import {
  IsDateString,
  IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MaxLength,
} from 'class-validator';

const emailOptions = {
  allow_display_name: false,
  ignore_max_length: false,
  allow_ip_domain: false,
  domain_specific_validation: true,
};

export default class Appointment {
    /**
     * ID
     */
    @IsOptional()
    id!: number

    /**
     * First Name
     */
    @Length(1, 50, { message: 'First Name must be from $constraint1 to $constraint2 characters' })
    @IsNotEmpty({ message: 'First Name is Required' })
    firstName!: string

    /**
     * Last Name
     */
    @Length(1, 50, { message: 'Last Name must be from $constraint1 to $constraint2 characters' })
    @IsNotEmpty({ message: 'Last Name is Required' })
    lastName!: string

    /**
     * Email
     */
    @IsEmail(emailOptions, { message: 'Email must be in the proper format' })
    @IsNotEmpty({ message: 'Email is Required' })
    email!: string

    /**
     * Phone Number
     */
    @Length(7, 17, { message: 'Phone Number must be from $constraint1 to $constraint2 characters' })
    @IsPhoneNumber('CA', { message: 'Phone Number Must be a valid Canadian format' })
    @IsNotEmpty({ message: 'Phone number is Required' })
    phone!: string

    /**
     * Address
     */
    @MaxLength(50, { message: 'Address can be at most $constraint1 characters ' })
    address!: string

    /**
     * Time
     */
    @IsNotEmpty({ message: 'Time is Required' })
    time!: string

    /**
     * Date
     */
    @IsDateString()
    @IsNotEmpty({ message: 'Date is Required' })
    date!: string

    /**
     * Location Address OPTIONAL
     */
    @MaxLength(50, { message: 'Location Address can be at most $constraint1 characters ' })
    @IsOptional()
    locationAddress!: string

    /**
     * Confirmed - BOOLEAN
     * - True if confirmed, false if not confirmed or while booking
     */
    confirmed!: boolean

    /**
     * Description
     */
    @IsNotEmpty({ message: 'Description is Required' })
    description!: string

  // /**
  //  * Role
  //  * - String that is either Client, or Staff
  //  */
  // @IsOptional()
  // @MaxLength(20, { message: 'Role must be ast most $constraint1 or $constraint2' })
  // @IsIn(['client', 'staff'])
  //     role!: string
} // End of file
