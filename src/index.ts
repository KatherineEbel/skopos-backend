import 'reflect-metadata'
import {PrismaClient} from '@prisma/client'
import {resolvers} from '@generated/type-graphql'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import dotenv from 'dotenv'
import app from './app'

const prisma = new PrismaClient()
dotenv.config()

export interface Context {
  prisma: PrismaClient;
}

async function main() {
  const schema = await buildSchema({
    resolvers,
  })

  const server = new ApolloServer({
    schema,
    context: (): Context => ({prisma})
  })

  await server.start()
  server.applyMiddleware({app})

  app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}/graphql`))
}

main().catch(e => console.log(e))