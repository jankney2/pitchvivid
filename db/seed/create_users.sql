create table users(
id serial primary key,
email varchar(50) not null,
first_name varchar(50) not null,
last_name varchar(50) not null,
hash text
)