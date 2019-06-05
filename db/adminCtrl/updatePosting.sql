update jobs
set 
details = ${details},
job_title = ${jobTitle},
filled = ${filled},
opening_date = ${openingDate},
closing_date = ${closingDate},
archived = ${archived},
admin_id = ${newId}
where id = ${id};