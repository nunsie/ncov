// import { GraphQLServer } from 'graphql-yoga'
import { GraphQLServerLambda } from 'graphql-yoga'
import ncov from './ncov'
import * as typeDefs from './schema.graphql'

const resolvers = {
  Query: {
    stats(parent, args, context, info) {
      return ncov.stats(parent, args, context, info)
    },
    countries(parent, args, context, info) {
      return ncov.countries(parent, args, context, info)
    },
    country(parent, args, context, info) {
      return ncov.country(parent, args, context, info)
    },
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
  })
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler