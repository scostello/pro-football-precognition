-- gid,seas,wk,day,date,v,h,stad,surf

CREATE TABLE IF NOT EXISTS schedule (
    game_id     integer,
    season      integer,
    week        integer,
    day         integer,
    date        date,
    visitor     varchar(3),
    home        varchar(3),
    stadium     varchar(50),
    surface     varchar(25)
);

COPY schedule
FROM '/Users/sean.costello/Development/nfl_00-16/SCHEDULE.csv' DELIMITER ',' CSV HEADER;