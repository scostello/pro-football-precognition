import registerTeamModel from './teams/model';

export default (app) => {
    const teams = registerTeamModel(app);

    return {
        teams,
    };
};