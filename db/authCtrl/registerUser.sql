insert into users (
  email,
  first_name,
  last_name, 
  hash
) values (
  ${email},
  ${firstName},
  ${lastName},
  ${hash}
)

returning *;