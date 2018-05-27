CREATE TABLE IF NOT EXISTS charts (
	play_id integer,
	number_of_runningbacks integer,
	number_of_tightends integer,
	dropped_pass smallint,
	broken_tackle smallint,
	yards_after_catch integer
);


COPY charts
FROM '/Users/sean.costello/Development/nfl_00-16/CHART.csv' DELIMITER ',' CSV HEADER;