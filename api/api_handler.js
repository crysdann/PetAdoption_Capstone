const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const { createPet, insertImg, getAllPets, getAllPetsByUser } = require("./pets.js");
const { addLostPet, insertPetImg, getLostPets, getLostPetsByUser } = require("./lostpets.js")
const { createUser, loginUser, getUserDetails } = require("./users.js");
const {
  createSuccessStory,
  getSuccessStories,
} = require("./successstories.js");
require("dotenv").config();

const resolvers = {
  Query: {
    getAllPets: getAllPets,
    getAllPetsByUser: getAllPetsByUser,
    getLostPets: getLostPets,
    getLostPetsByUser: getLostPetsByUser,
    getSuccessStories: getSuccessStories,
    getUserDetails: getUserDetails,
  },
  Mutation: {
    createPet: createPet,
    insertImg: insertImg,
    insertPetImg: insertPetImg,
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
