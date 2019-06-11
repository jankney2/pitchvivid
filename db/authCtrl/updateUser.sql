update users 
set email = ${email},
first_name = ${firstName},
last_name = ${lastName},
hash = ${hash},
resume = ${resume},
picture = ${picture}
where id = ${id}

returning *;