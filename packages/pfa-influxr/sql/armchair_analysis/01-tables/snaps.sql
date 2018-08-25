CREATE TABLE IF NOT EXISTS snaps (
	uuid        integer,
	game_id     integer,
	team        varchar,
	player      varchar(7),
	position    varchar,
	snaps       integer
);

COPY snaps
FROM '/Users/sean.costello/Development/nfl_00-16/SNAP.csv' DELIMITER ',' CSV HEADER;