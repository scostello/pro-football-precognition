CREATE TABLE IF NOT EXISTS snaps (
	uuid        bigint PRIMARY KEY NOT NULL DEFAULT id_generator(),
	id_game     bigint,
	team        varchar,
	player      bigint,
	position    varchar,
	snaps       integer
);