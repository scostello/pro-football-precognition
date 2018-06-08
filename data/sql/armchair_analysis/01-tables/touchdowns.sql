CREATE TABLE IF NOT EXISTS touchdowns (
	play_id integer,
	quarter smallint,
	minutes smallint,
	seconds smallint,
	down smallint,
	yards smallint,
	points smallint,
	scoring_player varchar(7),
	type varchar(4)
);

COPY touchdowns
FROM '/Users/sean.costello/Development/nfl_00-16/TD.csv' DELIMITER ',' CSV HEADER;