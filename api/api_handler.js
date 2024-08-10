const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const {
  createPet,
  insertImg,
  getAllPets,
  getAllPetsByUser,
  getPetDetails,
  updatePet,
  adoptPetDelete,
} = require("./pets.js");
const {
  addLostPet,
  insertPetImg,
  getLostPets,
  getLostPetsByUser,
  getLostPetDetails,
  updateLostPet,
  deleteLostPet,
} = require("./lostpets.js");
const {
  createUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
} = require("./users.js");
const {
  createSuccessStory,
  getSuccessStories,
  getSuccessStoriesByUser,
  searchSuccessStories,
  searchAdoptPets,
  deleteSuccessStory,
} = require("./successstories.js");
require("dotenv").config();

const resolvers = {
  Query: {
    getAllPets: getAllPets,
    getAllPetsByUser: getAllPetsByUser,
    getLostPets: getLostPets,
    getLostPetsByUser: getLostPetsByUser,
    getLostPetDetails: getLostPetDetails,
    getSuccessStories: getSuccessStories,
    getSuccessStoriesByUser: getSuccessStoriesByUser,
    getUserDetails: getUserDetails,
    getPetDetails: getPetDetails,
    searchSuccessStories,
    searchAdoptPets: async (_, { searchQuery }) => {
      return searchAdoptPets(_, { searchQuery });
    },
  },
  Mutation: {
    createPet: createPet,
    insertImg: insertImg,
    insertPetImg: insertPetImg,
    createSuccessStory: createSuccessStory,
    addLostPet: addLostPet,
    createUser: createUser,
    loginUser: loginUser,
    updatePet: updatePet,
    adoptPetDelete: adoptPetDelete,
    updateUserDetails: updateUserDetails,
    deleteSuccessStory: deleteSuccessStory,
    deleteLostPet: deleteLostPet,
    updateLostPet: updateLostPet,
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
