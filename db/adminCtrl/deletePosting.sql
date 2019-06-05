delete from job_users where job_id = ${jobId};
delete from admin_notes where job_id = ${jobId};
delete from jobs where id = ${jobId};