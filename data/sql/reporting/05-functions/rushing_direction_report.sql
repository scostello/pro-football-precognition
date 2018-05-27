CREATE OR REPLACE FUNCTION reporting.rushing_direction_report()
RETURNS TABLE (
    season       int,
    team_name    varchar,
    left_end     bigint,
    left_tackle  bigint,
    left_guard   bigint,
    middle       bigint,
    right_guard  bigint,
    right_tackle bigint,
    right_end    bigint
) AS $$
BEGIN

    RETURN QUERY
    SELECT
        g.season,
        tt.team_name,
        SUM(tt.rushing_attempts_leftend)      AS left_end,
        SUM(tt.rushing_attempts_lefttackle)   AS left_tackle,
        SUM(tt.rushing_attempts_leftguard)    AS left_guard,
        SUM(tt.rushing_attempts_middle)       AS middle,
        SUM(tt.rushing_attempts_rightguard)   AS right_guard,
        SUM(tt.rushing_attempts_righttackle)  AS right_tackle,
        SUM(tt.rushing_attempts_rightend)     AS right_end
    FROM
        reporting.team_totals AS tt
        INNER JOIN reporting.games AS g ON tt.id_game = g.id_game
    GROUP BY
        g.season,
        tt.team_name;

END;
$$ LANGUAGE plpgsql;