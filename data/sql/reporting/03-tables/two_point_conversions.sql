CREATE TABLE IF NOT EXISTS two_point_conversions (
	play_id integer,
	type varchar(4),
	ball_carrier varchar(7),
	passer varchar(7),
	pass_target varchar(7),
	converted smallint
);