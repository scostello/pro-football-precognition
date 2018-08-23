CREATE TABLE IF NOT EXISTS blocks (
	play_id integer,
	blocker varchar(7),
	recovering_player varchar(7)
);

COPY blocks
FROM '/Users/sean.costello/Development/nfl_00-16/BLOCK.csv' DELIMITER ',' CSV HEADER;