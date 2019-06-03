update users 
set email = ${email},
first_name = ${firstName},
last_name = ${lastName},
hash = ${hash}
where id = ${id}

returning *;