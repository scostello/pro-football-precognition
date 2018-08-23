CREATE TABLE IF NOT EXISTS stadiums (
    id_stadium          bigint PRIMARY KEY DEFAULT id_generator() NOT NULL,
	name                varchar(50),
	location_city       varchar(50),
	location_state      varchar(50),
	location_zipcode    varchar(12),
	location_longitude  numeric,
	location_latitude   numeric,
	location_geo        GEOGRAPHY(Point, 4326)
);