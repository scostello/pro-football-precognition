CREATE TABLE IF NOT EXISTS defense (
	uuid                    integer,
	game_id                 integer,
	player                  varchar(7),
	solo_tackles            numeric,
	combined_tackles        numeric,
	sacks                   numeric,
	safeties                smallint,
	blocked_kicks           smallint,
	interceptions           smallint,
	passes_defended         smallint,
	fumbles_recovered       smallint,
	fumbles_forced          smallint,
	touchdowns              smallint,
	return_yardage          integer,
	return_touchdowns       smallint,
	penalty_yardage         smallint,
	snaps                   smallint,
	fantasy_points_nfl      numeric,
	fantasy_points_fd_dk    numeric,
	player_game             smallint,
	seasons_played          smallint,
	nfl_season              integer,
	team                    varchar(3),
	position                varchar(8),
	jersey_number           smallint,
	depth_chart             smallint
);

COPY defense
FROM '/tmp/nfl_00-16/DEFENSE.csv' DELIMITER ',' CSV HEADER;