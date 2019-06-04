update jobs
set 
details = ${details},
filled = ${filled},
opening_date = ${openingDate},
closing_date = ${closingDate},
archived = ${archived},
admin_id = ${newId},
where id = ${jobId};