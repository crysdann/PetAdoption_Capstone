const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const { createPet, insertImg, getAllPets } = require("./pets.js");
const { addLostPet, getLostPets } = require("./lostpets.js");
const { createUser, loginUser } = require("./users.js");
const {
  createSuccessStory,
  getSuccessStories,
} = require("./successstories.js");
require("dotenv").config();

const resolvers = {
  Query: {
    getAllPets: getAllPets,
    getLostPets: getLostPets,
    getSuccessStories: getSuccessStories,
  },
  Mutation: {
    createPet: createPet,
    insertImg: insertImg,
    createSuccessStory: createSuccessStory,
    addLostPet: addLostPet,
    createUser: createUser,
    loginUser: loginUser,
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
