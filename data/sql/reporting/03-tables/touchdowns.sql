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