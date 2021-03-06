CREATE TABLE IF NOT EXISTS reporting.college (
	uuid                            bigint PRIMARY KEY NOT NULL DEFAULT public.id_generator(),
	ncaa_id                         integer,
	player                          bigint,
	class                           integer,
	college                         varchar,
	position                        varchar,
	games_played                    integer,
	passing_completions             integer,
	passing_attempts                integer,
	passing_yardage                 numeric,
	passing_touchdowns              integer,
	interceptions_by_quarterback    integer,
	passer_rating                   numeric,
	rushing_attempts                integer,
	rushing_yardage                 numeric,
	rushing_touchdowns              integer,
	receptions                      integer,
	receiving_touchdowns            integer,
	receiving_yardage               numeric,
	solo_tackles                    numeric,
	combined_tackles                numeric,
	tackles_for_loss                numeric,
	sacks                           numeric,
	interceptions_by_defender       integer,
	interception_return_yardage     numeric,
	interception_return_touchdowns  integer,
	fumbles_recovered               integer,
	fumble_return_yardage           numeric,
	fumble_return_touchdowns        integer,
	fumbles_forced                  integer,
	point_after_attempts            integer,
	point_after_made                integer,
	field_goal_attempts             integer,
	field_goal_made                 integer,
	kicker_points                   integer,
	punts                           integer,
	punt_yardage                    integer
);