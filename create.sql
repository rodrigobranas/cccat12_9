drop table cccat12.passenger;
drop schema cccat12;
create schema cccat12;

create table cccat12.passenger (
	passenger_id uuid primary key,
	name text,
	email text,
	document text
);

create table cccat12.driver (
	driver_id uuid primary key,
	name text,
	email text,
	document text,
	car_plate text
);