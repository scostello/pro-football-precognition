export const typeDefs = [`
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

export const resolvers = {
    Query: {
        teams: async (_, __, { teams }) => {
            const { models } = await teams
                .collection()
                .fetch();

            return models.map(team => team.attributes);
        },
    },
};
