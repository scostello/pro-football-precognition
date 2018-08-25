CREATE TABLE IF NOT EXISTS conversions (
	play_id         integer,
	type            varchar(4),
	ball_carrier    varchar(7),
	passer          varchar(7),
	pass_target     varchar(7),
	converted       smallint
);

COPY conversions
FROM '/Users/sean.costello/Development/nfl_00-16/CONV.csv' DELIMITER ',' CSV HEADER;