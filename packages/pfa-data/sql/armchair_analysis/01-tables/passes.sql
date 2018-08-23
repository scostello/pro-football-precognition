CREATE TABLE IF NOT EXISTS passes (
	play_id integer,
	passer varchar(7),
	target varchar(7),
	location varchar(2),
	yards smallint,
	completed smallint,
	successful_play smallint,
	spiked_ball smallint,
	defender varchar(7)
);

COPY passes
FROM '/Users/sean.costello/Development/nfl_00-16/PASS.csv' DELIMITER ',' CSV HEADER;