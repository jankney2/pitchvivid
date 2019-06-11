

select jobs.id, jobs.job_title,  to_char(jobs.opening_date, 'mm/dd/yyyy') as opening_date, companies.name
from job_users 
join jobs on jobs.id = job_users.job_id
join companies on companies.id = jobs.company_id
where job_users.user_id = ${user_id};

