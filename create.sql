drop schema cccat12 cascade;
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

create table cccat12.ride (
	ride_id uuid primary key,
	passenger_id uuid,
	driver_id uuid,
	transaction_id uuid,
	from_lat numeric,
	from_long numeric,
	to_lat numeric,
	to_long numeric,
	status text,
	request_date timestamp,
	accept_date timestamp,
	start_date timestamp,
	end_date timestamp,
	price numeric
);

create table cccat12.transaction (
	transaction_id uuid primary key,
	name text,
	email text,
	amount numeric
);
