create table job_users(
id serial primary key,
job_id int,
user_id int,
liked boolean,
disliked boolean,
video_url text,
foreign key (job_id) references jobs(id),
foreign key (user_id) references users(id)
)