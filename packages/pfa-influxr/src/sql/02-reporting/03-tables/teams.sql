CREATE TABLE IF NOT EXISTS teams (
    id_team         bigint DEFAULT public.id_generator() NOT NULL,
	id_stadium      bigint,
	name_abbr       varchar(3),
	name_full       varchar(25),
	mascot          varchar(25),
	id_logo         bigint,
	year_founded    date,
	current_owner   varchar(50)
);