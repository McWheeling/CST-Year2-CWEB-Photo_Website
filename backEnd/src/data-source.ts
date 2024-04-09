import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Location } from './entity/Location'
import { User } from './entity/User'
import { Appointment } from './entity/Appointment'
import { Portfolio } from './entity/Portfolio'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'sqlite.db',
  synchronize: true,
  logging: false,
  entities: [Location, User, Appointment, Portfolio],
  migrations: [],
  subscribers: []
})
