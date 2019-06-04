insert into job_users (
  user_id,
  job_id,
  video_url
) values (
  ${user_id},
  ${job_id},
  ${video_url}
)

returning *;