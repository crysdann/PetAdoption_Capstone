const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const { createPet, insertImg, getAllPets } = require("./pets.js");
const { createSuccessStory } = require("./successstories.js");
const { addLostPet } = require("./lostpets.js")
require("dotenv").config();

const resolvers = {
  Query: {
    getAllPets: getAllPets,
  },
  Mutation: {
    createPet: createPet,
    insertImg: insertImg,
    createSuccessStory: createSuccessStory,
    addLostPet: addLostPet,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("schema.graphql", "utf-8"),
  resolvers,
});

function installHandler(app) {
  const ENABLE_CORS = process.env.ENABLE_CORS === "true";
  server.applyMiddleware({ app, path: "/graphql", cors: ENABLE_CORS });
}

module.exports = { installHandler };
