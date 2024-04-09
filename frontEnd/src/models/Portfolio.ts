import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export default class Portfolio {
    @IsOptional()
    id!: number

    @Length(0, 500, { message: 'Description cannot be more than 500 characters' })
    description!: string

    @IsNotEmpty({ message: 'photographer name is required, put Unknown if you dont know' })
    photographerName!: string

    @IsNotEmpty({ message: 'Must have an image filename' })
    fileName!: string
}
