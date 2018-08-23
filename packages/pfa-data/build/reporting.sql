SET search_path=reporting;
DROP SCHEMA IF EXISTS reporting CASCADE;

CREATE SCHEMA reporting;
SET search_path = reporting;

SELECT 'Schema Initialized' AS result;
CREATE SEQUENCE IF NOT EXISTS id_sequence;

CREATE OR REPLACE FUNCTION id_generator(out id_new bigint)
AS
$$
DECLARE
    our_epoch bigint := 1495331934000;
    id_seq bigint;
    now_ms bigint;
    id_shard int := 2;
BEGIN

    SELECT nextval('reporting.id_sequence') % 1024 INTO id_seq;
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_ms;
    id_new := (now_ms - our_epoch) << 23;
    id_new := id_new | (id_shard << 10);
    id_new := id_new | (id_seq);

END
$$ LANGUAGE plpgsql;
CREATE TABLE IF NOT EXISTS blocks (
	play_id integer,
	blocker varchar(7),
	recovering_player varchar(7)
);
CREATE TABLE IF NOT EXISTS charts (
	play_id integer,
	number_of_runningbacks integer,
	number_of_tightends integer,
	dropped_pass smallint,
	broken_tackle smallint,
	yards_after_catch integer
);
CREATE TABLE IF NOT EXISTS defense (
	uuid integer,
	game_id integer,
	player varchar(7),
	solo_tackles numeric,
	combined_tackles numeric,
	sacks numeric,
	safeties smallint,
	blocked_kicks smallint,
	interceptions smallint,
	passes_defended smallint,
	fumbles_recovered smallint,
	fumbles_forced smallint,
	touchdowns smallint,
	return_yardage integer,
	return_touchdowns smallint,
	penalty_yardage smallint,
	snaps smallint,
	fantasy_points_nfl numeric,
	fantasy_points_fd_dk numeric,
	player_game smallint,
	seasons_played smallint,
	nfl_season integer,
	team varchar(3),
	position varchar(8),
	jersey_number smallint,
	depth_chart smallint
);
CREATE TABLE IF NOT EXISTS drives (
	uuid integer,
	game_id integer,
	first_play_id integer,
	team varchar(3),
	drive_number smallint,
	how_obtained varchar(4),
	quarter smallint,
	minutes smallint,
	seconds smallint,
	starting_field_position smallint,
	plays smallint,
	successful_plays smallint,
	rushing_first_downs smallint,
	passing_first_downs smallint,
	other_first_downs smallint,
	rushing_attempts smallint,
	rushing_yardage integer,
	passing_attempts smallint,
	passing_completions smallint,
	passing_yardage integer,
	penalty_yardage_for smallint,
	penalty_yardage_against smallint,
	net_yardage integer,
	result varchar(4)
);
CREATE TABLE IF NOT EXISTS field_goals_extra_points (
	play_id integer,
	type varchar(2),
	kicker varchar(7),
	distance smallint,
	was_made smallint
);
CREATE TABLE IF NOT EXISTS fumbles (
	play_id integer,
	fumbler varchar(7),
	recovering_player varchar(7),
	return_yardage integer,
	forcing_player varchar(7)
);
CREATE TABLE IF NOT EXISTS games (
	game_id integer,
	season integer,
	week smallint,
	day varchar(3),
	visiting_team varchar(3),
	home_team varchar(3),
	stadium varchar(45),
	temperature varchar(4),
	humidity varchar(4),
	wind_speed varchar(4),
	wind_direction varchar(4),
	conditions varchar(15),
	surface varchar(30),
	over_under numeric,
	vis_point_spread numeric,
	points_visitor smallint,
	points_home smallint
);
CREATE TABLE IF NOT EXISTS injuries (
	game_id integer,
	player varchar(7),
	team varchar(3),
	details varchar(25),
	practice_status varchar(35),
	game_status varchar(15)
);
CREATE TABLE IF NOT EXISTS interceptions (
	play_id integer,
	passer varchar(7),
	interceptor varchar(7),
	return_yardage smallint
);
CREATE TABLE IF NOT EXISTS kickers (
	uuid integer,
	game_id integer,
	player varchar(7),
	pats smallint,
	field_goals_short smallint,
	field_goals_med smallint,
	field_goals_long smallint,
	fantasy_points numeric,
	player_game_number smallint,
	seasons_played smallint,
	year integer,
	team varchar(3)
);
CREATE TABLE IF NOT EXISTS kickoffs (
	play_id integer,
	kicker varchar(7),
	gross_yardage smallint,
	net_yardage smallint,
	touchback smallint,
	returner varchar(7),
	return_yardage smallint
);
CREATE TABLE IF NOT EXISTS offense (
	uuid integer,
	game_id integer,
	player varchar(7),
	passing_attempts smallint,
	passing_completions smallint,
	passing_yardage integer,
	interceptions smallint,
	passing_touchdowns smallint,
	rushing_attempts smallint,
	successful_rushing_attempts smallint,
	rushing_yardage integer,
	rushing_touchdowns smallint,
	times_targeted smallint,
	receptions smallint,
	receiving_yardage integer,
	receiving_touchdowns smallint,
	returns smallint,
	return_yardage integer,
	return_touchdowns smallint,
	fumbles_lost smallint,
	penalty_yardage smallint,
	conversion smallint,
	snaps smallint,
	fantasy_points_nfl numeric,
	fantasy_points_fd numeric,
	fantasy_points_dk numeric,
	player_game_number smallint,
	seasons_played smallint,
	year integer,
	team varchar(3),
	position_detail varchar(8),
	jersey_number smallint,
	depth_chart smallint
);
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
CREATE TABLE IF NOT EXISTS penalties (
	uuid integer,
	play_id integer,
	flagged_team varchar(3),
	flagged_player varchar(7),
	description varchar(40),
	category smallint,
	assessed_yardage smallint,
	action varchar
);
CREATE TABLE IF NOT EXISTS players (
	player_id varchar(7),
	first_name varchar(20),
	last_name varchar(25),
	play_by_play_name varchar(25),
	position_1 varchar(2),
	position_2 varchar(2),
	height smallint,
	weight integer,
	year_of_birth date,
	forty numeric,
	bench smallint,
	vertical numeric,
	broad integer,
	shuttle numeric,
	cone numeric,
	arm_length numeric,
	hand_size numeric,
	draft_position integer,
	college varchar,
	college_division varchar,
	first_year integer,
	current_team varchar,
	position_detail varchar,
	jersey_number smallint,
	depth_chart smallint
);
CREATE TABLE IF NOT EXISTS plays (
	play_id integer,
	game_id integer,
	team_on_offense varchar(3),
	team_on_defense varchar(3),
	play_type varchar(10),
	drive_sequence smallint,
	length_in_seconds smallint,
	quarter smallint,
	minutes smallint,
	seconds smallint,
	points_offense smallint,
	points_defense smallint,
	timeouts_offense smallint,
	timeouts_defense smallint,
	down smallint,
	yards_to_go smallint,
	yards_from_own_goaline smallint,
	field_zone smallint,
	first_down smallint,
	shotgun smallint,
	no_huddle smallint,
	points_scored smallint,
	tackle_on_play smallint,
	sack_on_play smallint,
	penalty_on_play smallint,
	interception_on_play smallint,
	fumble_on_play smallint,
	safety_on_play smallint,
	block_on_play smallint
)
CREATE TABLE IF NOT EXISTS punts (
	play_id integer,
	punter varchar(7),
	gross_yardage smallint,
	net_yardage smallint,
	touchback smallint,
	returner varchar(7),
	return_yardage smallint,
	fair_caught smallint
);
CREATE TABLE IF NOT EXISTS redzone_appearances (
	uuid integer,
	game_id integer,
	player varchar(7),
	passing_attempts smallint,
	passing_completions smallint,
	passing_yardagey integer,
	interceptions smallint,
	rushing_attempts smallint,
	successful_rushing_attempts smallint,
	rushing_yardage integer,
	times_targeted smallint,
	receptions smallint,
	receiving_yardage integer,
	fumbles_lost smallint,
	penalty_yardage smallint
);
CREATE TABLE IF NOT EXISTS rushes (
	play_id integer,
	ball_carrier varchar(7),
	rush_direction varchar(2),
	yards_gained smallint,
	successful_play smallint,
	kneel_down smallint
);
CREATE TABLE IF NOT EXISTS sacks (
	uuid integer,
	play_id integer,
	quarter_back varchar(7),
	sacking_player varchar(7),
	value numeric(2,1),
	yards_lost integer
);
CREATE TABLE IF NOT EXISTS safeties (
	play_id integer,
	defender varchar(7)
);
CREATE TABLE IF NOT EXISTS snaps (
	uuid integer,
	game_id integer,
	team varchar,
	player varchar(7),
	position varchar,
	snaps integer
);
CREATE TABLE IF NOT EXISTS stadiums (
    id_stadium bigint default id_generator() not null,
	name varchar(50),
	location_city varchar(50),
	location_state varchar(50),
	location_zipcode varchar(12),
	location_longitude numeric,
	location_latitude numeric,
	location_geo GEOGRAPHY(Point, 4326)
);
CREATE TABLE IF NOT EXISTS tackles (
	uuid integer,
	play_id integer,
	tackler varchar(7),
	value numeric
);
CREATE TABLE IF NOT EXISTS team_totals (
	team_total_id integer,
	game_id integer,
	team_name varchar(3),
	points smallint,
	points_quarter_one smallint,
	points_quarter_two smallint,
	points_quarter_three smallint,
	points_quarter_four smallint,
	first_downs_rushing smallint,
	first_downs_passing smallint,
	first_downs_penalty smallint,
	rushing_attempts smallint,
	rushing_yardage integer,
	passing_attempts smallint,
	passing_completions smallint,
	passing_yardage integer,
	sacks_against smallint,
	interceptions smallint,
	fumbles_against smallint,
	punts smallint,
	gross_punt_yardage integer,
	punt_returns smallint,
	punt_return_yardage integer,
	kickoff_returns smallint,
	kickoff_return_yardage integer,
	interception_returns smallint,
	interception_return_yardage integer,
	penalty_yardage_against integer,
	time_of_possession numeric,
	touchdowns smallint,
	rushing_touchdowns smallint,
	passing_touchdowns smallint,
	turnover_touchdowns smallint,
	field_goals_made smallint,
	field_goal_attempts smallint,
	field_goal_yardage integer,
	redzone_drives smallint,
	redzone_touchdowns smallint,
	big_rush_yardage integer,
	big_pass_yardage integer,
	successful_rush_plays smallint,
	successful_rush_firstdown smallint,
	successful_rush_seconddown smallint,
	successful_rush_thirddown smallint,
	successful_pass_plays smallint,
	successful_pass_firstdown smallint,
	successful_pass_seconddown smallint,
	successful_pass_thirddown smallint,
	rushing_attempts_leftend smallint,
	rushing_yardage_leftend integer,
	rushing_attempts_lefttackle smallint,
	rushing_yardage_lefttackle integer,
	rushing_attempts_leftguard smallint,
	rushing_yardage_leftguard integer,
	rushing_attempts_middle smallint,
	rushing_yardage_middle integer,
	rushing_attempts_rightguard smallint,
	rushing_yardage_rightguard integer,
	rushing_attempts_righttackle smallint,
	rushing_yardage_righttackle integer,
	rushing_attempts_rightend smallint,
	rushing_yardage_rightend integer,
	rushing_attempts_firstdown smallint,
	rushing_yardage_firstdown integer,
	rushing_attempts_seconddown smallint,
	rushing_yardage_seconddown integer,
	rushing_attempts_thirddown smallint,
	rushing_yardage_thirddown integer,
	rushing_attempts_quarterback smallint,
	rushing_yardage_quarterback integer,
	passing_attempts_shortleft smallint,
	passing_yardage_shortleft integer,
	passing_attempts_shortmiddle smallint,
	passing_yardage_shortmiddle integer,
	passing_attempts_shortright smallint,
	passing_yardage_shortright integer,
	passing_attempts_deepleft smallint,
	passing_yardage_deepleft integer,
	passing_attempts_deepmedium smallint,
	passing_yardage_deepmedium integer,
	passing_attempts_deepright smallint,
	passing_yardage_deepright integer,
	passing_attempts_wr1_2 smallint,
	passing_yardage_wr1_2 integer,
	passing_attempts_wr3_4_5 smallint,
	passing_yardage_wr3_4_5 integer,
	passing_attempts_tightend smallint,
	passing_yardage_tightend integer,
	passing_attempts_runningback smallint,
	passing_yardage_runningback integer,
	passing_shotgun_attempts smallint,
	passing_shotgun_yardage integer,
	passing_attempts_firstdown smallint,
	passing_yardage_firstdown integer,
	passing_attempts_seconddown smallint,
	passing_yardage_seconddown integer,
	passing_attempts_thirddown smallint,
	passing_yardage_thirddown integer,
	passing_completions_short smallint,
	passing_completions_medium smallint,
	passing_completions_long smallint,
	rushing_attempts_quarter_one smallint,
	rushing_yardage_quarter_one integer,
	passing_attempts_quarter_one smallint,
	passing_yardage_quarter_one integer,
	rushing_attempts_lateclose smallint,
	rushing_yardage_lateclose integer,
	passing_attempts_lateclose smallint,
	passing_yardage_lateclose integer,
	rushing_attempts_redzone smallint,
	rushing_yardage_redzone integer,
	passing_attempts_redzone smallint,
	passing_yardage_redzone integer,
	yardage_lost_to_sacks integer,
	sacks_by_lbs numeric,
	sacks_by_dbs numeric,
	starting_field_position integer,
	drives_on_offense smallint,
	net_punt_yardage integer,
	touchbacks smallint,
	punts_inside_20 smallint,
	return_touchdowns smallint,
	rushing_tackles_defensiveline numeric,
	passing_tackles_defensiveline numeric,
	rushing_tackles_linebackers numeric,
	passing_tackles_linebackers numeric,
	rushing_tackles_defensivebacks numeric,
	passing_tackles_defensivebacks numeric,
	no_huddle_attempts smallint,
	third_and_short_attempts smallint,
	third_and_short_conversions smallint,
	third_and_long_attempts smallint,
	third_and_long_conversions smallint,
	stuffed_runs smallint,
	points_by_defense smallint,
	false_starts smallint,
	penalty_offensive_holds smallint,
	penalty_playbook_execution smallint,
	penalty_defensive_line smallint,
	penalty_defensive_secondary smallint,
	penalty_dumb smallint,
	poor_fundamental smallint,
	snaps_on_offense smallint,
	snaps_on_defense smallint
);
CREATE TABLE IF NOT EXISTS teams (
    id_team bigint DEFAULT id_generator() NOT NULL,
	id_stadium bigint,
	name_abbr varchar(3),
	name_full varchar(25),
	mascot varchar(25),
	id_logo bigint,
	year_founded date,
	current_owner varchar(50)
);
CREATE TABLE IF NOT EXISTS touchdowns (
	play_id integer,
	quarter smallint,
	minutes smallint,
	seconds smallint,
	down smallint,
	yards smallint,
	points smallint,
	scoring_player varchar(7),
	type varchar(4)
);
CREATE TABLE IF NOT EXISTS two_point_conversions (
	play_id integer,
	type varchar(4),
	ball_carrier varchar(7),
	passer varchar(7),
	pass_target varchar(7),
	converted smallint
);
CREATE OR REPLACE FUNCTION rushing_direction_by_season()
RETURNS TABLE (
    season       int,
    team_name    varchar,
    team_abbr    varchar,
    middle       int,
    left_end     int,
    left_tackle  int,
    left_guard   int,
    right_guard  int,
    right_tackle int,
    right_end    int
) AS $$
BEGIN

    RETURN QUERY
    SELECT
        season,
        name_abbr,
        name_full,
        SUM(rushing_attempts_middle)      AS middle,
        SUM(rushing_attempts_leftend)     AS left_end,
        SUM(rushing_attempts_lefttackle)  AS left_tackle,
        SUM(rushing_attempts_leftguard)   AS left_guard,
        SUM(rushing_attempts_rightguard)  AS right_guard,
        SUM(rushing_attempts_righttackle) AS right_tackle,
        SUM(rushing_attempts_rightend)    AS right_end
    FROM
        reporting.team_totals AS tt
        INNER JOIN reporting.games AS g ON tt.game_id = g.game_id
        INNER JOIN reporting.teams AS t ON tt.team_name = t.name_abbr
    GROUP BY
        season,
        name_abbr,
        name_full;

END;
$$ LANGUAGE plpgsql;