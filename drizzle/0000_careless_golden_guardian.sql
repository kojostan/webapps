CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`deleted` integer DEFAULT 0 NOT NULL
);
