CREATE OR REPLACE FUNCTION reporting.rushing_stats_season()
RETURNS TABLE (
    season     int,
    player     varchar,
    team       varchar,
    attempts   bigint,
    yardage    bigint,
    average    numeric,
    ypg        numeric,
    touchdowns bigint
) AS $$
#variable_conflict use_column
BEGIN

    RETURN QUERY
    WITH player_games AS (
        SELECT
            p.id_player,
            o.year,
            count(*) AS games_played
        FROM
            reporting.offense AS o
            INNER JOIN reporting.players AS p ON o.player = p.id_player
            INNER JOIN reporting.games AS d ON o.id_game = d.id_game
        WHERE
            week <= 17 -- Regular season
        GROUP BY
            p.id_player,
            o.year,
            o.player
    ), sums_by_year AS (
        SELECT
            p.id_player,
            o.year,
            o.team,
            SUM(rushing_attempts)   AS attempts,
            SUM(rushing_yardage)    AS yardage,
            SUM(rushing_touchdowns) AS touchdowns
        FROM
            reporting.offense AS o
            INNER JOIN reporting.players AS p ON o.player = p.id_player
            INNER JOIN reporting.games AS g ON o.id_game = g.id_game
        WHERE
            rushing_attempts > 0
            AND week <= 17 -- Regular season
        GROUP BY
            p.id_player,
            o.year,
            o.team
    ), averages_by_year AS (
        SELECT
            sby.year,
            sby.id_player,
            team,
            AVG(yardage / attempts::numeric) AS average,
            AVG(yardage / games_played::numeric) AS ypg
        FROM
            sums_by_year AS sby
            INNER JOIN player_games AS pg ON sby.id_player = pg.id_player AND sby.year = pg.year
        GROUP BY
            sby.year,
            sby.id_player,
            team
    )
    SELECT
        sby.year,
        (p.first_name || ' ' || p.last_name)::varchar AS player,
        sby.team,
        attempts,
        yardage,
        average,
        ypg,
        touchdowns
    FROM
        sums_by_year AS sby
        INNER JOIN averages_by_year AS aby ON sby.year = aby.year AND sby.id_player = aby.id_player
        INNER JOIN reporting.players AS p ON sby.id_player = p.id_player;
END;
$$ LANGUAGE plpgsql;