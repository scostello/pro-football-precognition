CREATE TABLE IF NOT EXISTS snaps (
	uuid        integer,
	game_id     integer,
	team        varchar,
	player      varchar(7),
	position    varchar,
	snaps       integer
);

COPY snaps
FROM '/tmp/nfl_00-16/SNAP.csv' DELIMITER ',' CSV HEADER;