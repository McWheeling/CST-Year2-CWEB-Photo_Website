import {
  IsOptional, Length, MaxLength, IsNotEmpty, IsEmail, IsPhoneNumber, Matches, IsIn,
} from 'class-validator';

const emailOptions = {
  allow_display_name: false,
  ignore_max_length: false,
  allow_ip_domain: false,
  // additional validation, e.g. disallowing certain valid emails that are rejected by GMail.
  domain_specific_validation: true,
};

export default class User {
    id!: string;
    // UUID

    @Length(1, 50, { message: 'First name must be from $constraint1 to $constraint2 characters' })
    @IsNotEmpty({ message: 'First name is required ' })
    firstName!: string;

    @Length(1, 50, { message: 'First name must be from $constraint1 to $constraint2 characters' })
    @IsNotEmpty({ message: 'First name is required ' })
    lastName!: string;

    @Length(7, 17, { message: 'Phone Number must be from $constraint1 to $constraint2 characters' })
    @IsPhoneNumber('CA', { message: 'Phone Number Must be a valid Canadian format' })
    @IsNotEmpty({ message: 'Phone number is Required' })
    phoneNumber!: string;

    @MaxLength(50, { message: 'Address can be at most $constraint1 characters ' })
    @IsOptional()
    address!: string;

    @IsOptional()
    @MaxLength(20, { message: 'Role must be ast most $constraint1  or $constraint2' })
    @IsIn(['client', 'staff'])
    role!: string

    @IsEmail(emailOptions, { message: 'Email must be in the proper format' })
    @IsNotEmpty({ message: 'Email is Required' })
    email!: string; //

    @Matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password must contain uppercase, lowercase, and numbers' },
    )
    @Length(8, 25, { message: 'Password must be from $constraint1 to $constraint2 characters ' })
    @IsNotEmpty({ message: 'Password is Required' })
    password!: string
}
