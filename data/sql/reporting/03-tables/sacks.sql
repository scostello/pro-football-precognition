CREATE TABLE IF NOT EXISTS sacks (
	uuid integer,
	play_id integer,
	quarter_back varchar(7),
	sacking_player varchar(7),
	value numeric(2,1),
	yards_lost integer
);