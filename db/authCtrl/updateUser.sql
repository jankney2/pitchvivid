update users 
set email = ${email},
first_name = ${firstName},
last_name = ${lastName},
hash = ${hash},
resume = ${resume}
where id = ${id}

returning *;