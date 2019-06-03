create table annoying_users (
  id serial primary key,
  user_id int,
  foreign key (user_id) references users (id),
  admin_id int,
  foreign key (admin_id) references admins (id),
  banned boolean default false
)