CREATE TABLE IF NOT EXISTS rushes (
	play_id         integer,
	ball_carrier    varchar(7),
	rush_direction  varchar(2),
	yards_gained    smallint,
	successful_play smallint,
	kneel_down      smallint
);

COPY rushes
FROM '/tmp/nfl_00-16/RUSH.csv' DELIMITER ',' CSV HEADER;