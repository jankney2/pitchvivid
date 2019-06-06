select job_users.job_id, admin_notes.notes, users.first_name as firstName, users.last_name as lastName, job_users.video_url, admin_notes.liked, job_users.user_id as userId, users.email
from job_users
left join admin_notes on admin_notes.user_id = job_users.user_id
left join users on users.id = job_users.user_id
where job_users.job_id = ${job_id}
and job_users.user_id not in
    (select user_id from blocked_users)
and job_users.user_id not in
    (select user_id from annoying_users where admin_id = ${admin_id});