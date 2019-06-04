create table admin_notes(
id serial primary key,
job_id int,
foreign key (job_id) references jobs(id),
user_id int,
foreign key (user_id) references users(id),
notes text,
liked boolean,
disliked boolean
)