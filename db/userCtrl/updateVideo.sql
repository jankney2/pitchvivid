update job_users
set video_url = ${video_url}
where user_id = ${user_id} and job_id = ${job_id}

returning *;