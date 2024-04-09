/**
 * Location Entity
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty, IsOptional } from 'class-validator'

@Entity()
export class Location {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  @IsOptional()
    id: number

  /**
   * Google Map lat Location
   * Check the precision and scale values
   * EX:
   *  lat: 52.14387817689365,
   */
  @Column({ type: 'double precision', precision: 22, scale: 18 })
    lat: number

  /**
   * Google Map lng Location
   * EX:
   *  lng: -106.669385571664,
   */
  @Column({ type: 'double precision', precision: 22, scale: 18 })
    lng: number

  /**
   * Description
   */
  @Column({ type: 'nvarchar', length: 500 })
  @IsNotEmpty({ message: 'Description is Required' })
    description: string

  /**
   * Label
   */
  @Column({ type: 'nvarchar', length: 100})
  @IsNotEmpty({ message: 'Label is Required'})
    label: string

  /**
   *  Image File Name (Will append this to the end of the filePath)
   *  - Windows File Path only allows 256 characters
   */
  @Column({ type: 'nvarchar', length: 256 })
    fileName: string
}
