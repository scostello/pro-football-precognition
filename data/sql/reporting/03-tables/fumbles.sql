CREATE TABLE IF NOT EXISTS fumbles (
	id_play             bigint,
	fumbler             bigint,
	recovering_player   bigint,
	return_yardage      integer,
	forcing_player      bigint
);