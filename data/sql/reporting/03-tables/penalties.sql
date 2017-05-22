CREATE TABLE IF NOT EXISTS penalties (
	uuid integer,
	play_id integer,
	flagged_team varchar(3),
	flagged_player varchar(7),
	description varchar(40),
	category smallint,
	assessed_yardage smallint,
	action varchar
);