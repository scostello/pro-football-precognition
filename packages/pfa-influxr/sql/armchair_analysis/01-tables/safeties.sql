CREATE TABLE IF NOT EXISTS safeties (
	play_id     integer,
	defender    varchar(7)
);

COPY safeties
FROM '/Users/sean.costello/Development/nfl_00-16/SAFETY.csv' DELIMITER ',' CSV HEADER;