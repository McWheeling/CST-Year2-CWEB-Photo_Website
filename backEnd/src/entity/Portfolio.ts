/**
 * Portfolion Entity
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsOptional, Length } from 'class-validator'

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  @IsOptional()
    id: number

  /*
    Description for the given image
   */
  @Column({ type: 'nvarchar', length: 500, nullable: true })
  @Length(0, 500, { message: 'Description cannot be more than 500 characters' })
    description: string

  /*
    Name of the photographer
   */
  @Column({ type: 'nvarchar', length: 50, nullable: false })
    photographerName: string

  /*
    This stores the filename of a image file
   */
  @Column({ type: 'nvarchar', length: 256 })
    fileName: string
}
