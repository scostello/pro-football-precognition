CREATE TABLE IF NOT EXISTS kickoffs (
	play_id         integer,
	kicker          varchar(7),
	gross_yardage   smallint,
	net_yardage     smallint,
	touchback       smallint,
	returner        varchar(7),
	return_yardage  smallint
);

COPY kickoffs
FROM '/tmp/nfl_00-16/KOFF.csv' DELIMITER ',' CSV HEADER;