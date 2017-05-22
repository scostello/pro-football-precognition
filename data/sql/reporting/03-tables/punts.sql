CREATE TABLE IF NOT EXISTS punts (
	play_id integer,
	punter varchar(7),
	gross_yardage smallint,
	net_yardage smallint,
	touchback smallint,
	returner varchar(7),
	return_yardage smallint,
	fair_caught smallint
);