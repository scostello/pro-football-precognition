CREATE TABLE IF NOT EXISTS field_goals_extra_points (
	play_id integer,
	type varchar(2),
	kicker varchar(7),
	distance smallint,
	was_made smallint
);