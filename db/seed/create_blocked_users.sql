create table blocked_users(
id serial primary key,
user_id int,
foreign key (user_id) references users(id),
banned boolean default FALSE
)