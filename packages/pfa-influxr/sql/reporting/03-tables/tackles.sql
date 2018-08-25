CREATE TABLE IF NOT EXISTS tackles (
	uuid    bigint PRIMARY KEY DEFAULT id_generator() NOT NULL,,
	id_play bigint,
	tackler bigint,
	value   numeric
);