export const typeDefs = [`
    type Team {
        id              : String
        stadium         : String
        nameAbbr        : String
        nameFull        : String
        mascot          : String
        dateFounded     : Int
        currentOwner    : String       
    }
    
    extend type Query {
        teams(
            teamId: String
        ): [Team]
    }
`];

export const resolvers = {
    Query: {
        teams: async () => ({}),
    },
};