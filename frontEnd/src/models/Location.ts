/**
 * Location Model Entity File
 */
import { IsNotEmpty, IsOptional } from 'class-validator';

export default class Location {
  /**
   * ID
   */
  @IsOptional()
  id!: number

  /**
   * Google Map lat Location
   * Check the precision and scale values
   * EX:
   *  lat: 52.14387817689365,
   */
  lat!: number

  /**
   * Google Map lng Location
   * EX:
   *  lng: -106.669385571664,
   */
  lng!: number

  /**
   * Description
    */
  @IsNotEmpty({ message: 'Location Description is Required' })
    description!: string

  /**
   * Label
   */
  @IsNotEmpty({ message: 'Label is Required' })
    label!: string

  /**
   *  Image File Name (Will append this to the end of the filePath)
   *  - Windows File Path only allows 256 characters
   */
  fileName!: string
}
