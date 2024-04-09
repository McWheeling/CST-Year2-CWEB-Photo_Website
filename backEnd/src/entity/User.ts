/**
 * User Entity
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, Length, Matches, MaxLength } from 'class-validator'

const emailOptions = {
  allow_display_name: false,
  ignore_max_length: false,
  allow_ip_domain: false,
  domain_specific_validation: true
}

@Entity()
export class User {
  /**
  * ID using UUID
  */
  @PrimaryGeneratedColumn('uuid')
    id: string

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
  @Column('varchar', { length: 50, nullable: true })
  @MaxLength(50, { message: 'Address can be at most $constraint1 characters ' })
  @IsOptional()
    address: string

  /**
  * Role
  * - String that is either Client, or Staff
  */
  @Column({ type: 'varchar', length: 20, nullable: false })
  @IsOptional()
  @MaxLength(20, { message: 'Role must be ast most $constraint1  or $constraint2' })
  @IsIn(['client', 'staff'])
    role: string

  /**
  * Email
  */
  @Column({ type: 'varchar', length: 320, nullable: false })
  @IsEmail(emailOptions, { message: 'Email must be in the proper format' })
  @IsNotEmpty({ message: 'Email is Required' })
    email: string

  /**
  * Password
  */
  @Column('nvarchar', { length: 25, nullable: false, select: false /* hide password from regular query */ })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain uppercase, lowercase, and numbers' })
  @Length(8, 25, { message: 'Password must be from $constraint1 to $constraint2 characters ' })
  @IsNotEmpty({ message: 'Password is Required' })
    password: string
}
