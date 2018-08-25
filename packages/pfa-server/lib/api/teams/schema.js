"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const typeDefs = exports.typeDefs = [`
    type Team {
        idTeam        : String
        idStadium     : String
        nameAbbr      : String
        nameFull      : String
        mascot        : String
        dateFounded   : Date
        currentOwner  : String       
    }
    
    extend type Query {
        teams(
            teamId: String
        ): [Team]
    }
`];

const resolvers = exports.resolvers = {
    Query: {
        teams: async (_, __, { teams }) => {
            var _ref = await teams.collection().fetch();

            const models = _ref.models;


            return models.map(team => team.attributes);
        }
    }
};