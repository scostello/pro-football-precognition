CREATE TABLE IF NOT EXISTS safeties (
	play_id     integer,
	defender    varchar(7)
);

COPY safeties
FROM '/tmp/nfl_00-18/SAFETY.csv' DELIMITER ',' CSV HEADER;