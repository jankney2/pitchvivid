update admins 
set email = ${email},
first_name = ${firstName},
last_name = ${lastName},
owner = ${owner},
hash = ${hash}
where id = ${id}

returning *;