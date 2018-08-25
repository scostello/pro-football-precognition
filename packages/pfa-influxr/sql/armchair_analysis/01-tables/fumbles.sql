CREATE TABLE IF NOT EXISTS fumbles (
	play_id             integer,
	fumbler             varchar(7),
	recovering_player   varchar(7),
	return_yardage      integer,
	forcing_player      varchar(7)
);

COPY fumbles
FROM '/Users/sean.costello/Development/nfl_00-16/FUMBLE.csv' DELIMITER ',' CSV HEADER;