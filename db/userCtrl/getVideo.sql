-- select * 

-- from job_users
-- where user_id = ${user_id} and job_id = ${job_id};


select job_users.*, jobs.*, companies.name as company_name
from job_users
join jobs on jobs.id = job_users.job_id
join companies on companies.id = job_users.job_id
where job_users.user_id = ${user_id} and job_users.job_id = ${job_id}