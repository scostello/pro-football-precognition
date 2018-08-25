CREATE TABLE IF NOT EXISTS field_goals_extra_points (
	play_id     integer,
	type        varchar(2),
	kicker      varchar(7),
	distance    smallint,
	was_made    smallint
);

COPY field_goals_extra_points
FROM '/tmp/nfl_00-16/FGXP.csv' DELIMITER ',' CSV HEADER;