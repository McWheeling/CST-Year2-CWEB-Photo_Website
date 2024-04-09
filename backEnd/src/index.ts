import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import * as createError from 'http-errors'
import * as cors from 'cors'
import LocationController from './controller/LocationController'
import { Location } from './entity/Location'
import { RouteDefinition } from './decorator/RouteDefinition'
import UserController from './controller/UserController'
import AppointmentController from './controller/AppointmentController'
import PortfolioController from './controller/PortfolioController'
import { Portfolio } from './entity/Portfolio'
import { User } from "./entity/User";

const port = 8081

// CORS options
const corsOptions = {
  origin: /localhost\:\d{4,5}$/i, // localhost any 4 or 5 digit port, updated to be 5 for LO6 temporary-student-ui HTML file
  credentials: true, // needed to set and return cookies
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  methods: 'GET,PUT,POST,DELETE',
  maxAge: 43200 // 12 hours
}

AppDataSource.initialize().then(async () => {
  // Create express app
  const app = express()
  app.use(bodyParser.json())

  app.use(cors(corsOptions)) // Enable cors for all handlers, handles the preflight check

  // --- require headers 'X-Requested-With: XmlHttpRequest' and 'Accept:application/json' ---
  // app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  //   if (req.xhr && req.accepts('application/json')) next()
  //   else next(createError(406))
  // })

  // add handler for pr-flight options request to ANY path
  app.options('*', cors(corsOptions))

  // Iterate over all our controllers and register our routes
  const controllers: any[] = [LocationController, UserController, AppointmentController, PortfolioController]
  controllers.forEach((controller) => {
    // This is our instantiated class
    // eslint-disable-next-line new-cap
    const instance = new controller()
    // The prefix saved to our controller
    const path = Reflect.getMetadata('path', controller)
    // Our `routes` array containing all our routes for this controller
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller)

    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
      // eslint-disable-next-line
            app[route.method.toLowerCase()](path + route.param, (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = instance[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) => result !== null && result !== undefined ? res.send(result) : next())
            .catch((err) => next(createError(500, err)))
        } else if (result !== null && result !== undefined) res.json(result)
      })
    })
  })

  // catch 404 and forward to error handler - this is a catch all
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({ status: err.status, message: err.message, stack: err.stack.split(/\s{4,}/) })
  })

  // start express server
  app.listen(port)

    /**
     * Insert new Location's for testing
     */
  await AppDataSource.manager.query('DELETE FROM location')
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Location,{
        lat: 52.14335049194675,
        lng: -106.66966430864213,
        description: "Polytech, where CST is taught by many wonderful instructors! - Photo Credit Below: Polytechnics Canada.",
        label: "Saskatchewan Polytechnic",
        fileName: "https://polytechnicscanada.ca/wp-content/uploads/2020/07/190327-saskpoly-01.jpg"
    })
  )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Location,{
            lat: 52.1587478996564,
            lng: -106.5871171644022,
            description: "Where creatures live in a cool fun place where they meet new people. - Photo Credit Below: U of R Journalism School.",
            label: "Saskatoon Forestry Farm Park & Zoo",
            fileName: "http://ink.urjschool.ca/wp-content/uploads/2021/12/portasummer3258-1-scaled.jpg"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Location,{
            lat: 52.12295324379849,
            lng: -106.6654201813483,
            description: "K W Nasser Plaza is the heart of the new River Landing Location",
            label: "K W Nasser Plaza",
            fileName: "https://i.cbc.ca/1.6127680.1627999284!/fileImage/httpImage/kw-nasser-plaza.jpg"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Location,{
            lat: 52.095622489558174,
            lng: -106.68797570447217,
            description: "Year-round park with an 18-hole disc-golf course & a picnic area, plus ski trails & a sledding hill  - Photo Credit Below: Wikipedia.",
            label: "Diefenbaker Park",
            fileName: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/DiefenbakerHill.jpg/250px-DiefenbakerHill.jpg"
        })
    )

    /**
     * Insert new Portfolio's for testing
     */
  await AppDataSource.manager.query('DELETE FROM portfolio')
  // insert new portfolio for test
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Portfolio, {
      description: 'City of Saskatoon',
      fileName: 'https://media.discordapp.net/attachments/1047197988172333126/1050858654150172672/F8322931-F496-413E-8209-AE7F0F645F27.jpg?width=876&height=584',
      photographerName: 'Taken By: Jared Striemer'
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Portfolio, {
      description: 'City of Saskatoon',
      fileName: 'https://media.discordapp.net/attachments/1043194018063982662/1050859288345710722/281A4927.jpg?width=1038&height=584',
      photographerName: 'Taken By: Jared Striemer'
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Portfolio, {
      description: 'Let it snow',
      fileName: 'https://media.discordapp.net/attachments/1043194018063982662/1050869466675822592/281A8990.jpg?width=1017&height=572',
      photographerName: 'Taken By: Jared Striemer'
    })
  )

  await AppDataSource.manager.save(
    AppDataSource.manager.create(Portfolio, {
      description: 'Saskatchewan Sunset',
      fileName: 'https://media.discordapp.net/attachments/1043194018063982662/1050869047006347284/281A4977.jpg?width=858&height=572',
      photographerName: 'Taken By: Jared Striemer'
    })
  )

    /**
     * Insert new Users's for testing
     */
    // await AppDataSource.manager.query('DELETE FROM user') - It says it doesn't know where the user table is. so commented it out
    // insert new portfolio for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User,{
            firstName: "Jared",
            lastName: "Striemer",
            phone: "306-555-5555",
            address: "123 Center Wheels St",
            role: "staff",
            email: "coolwheels@disabled.ca",
            password: "12345Pw-"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User,{
            firstName: "Morgan",
            lastName: "Hamata",
            phone: "306-696-6969",
            address: "700 Energy Way",
            role: "client",
            email: "monsterenergy@disabled.ca",
            password: "12345Pw-"
        })
    )

    console.log('Open http://localhost:' + port + '/backEnd to see results')
}).catch(error => console.log(error))
