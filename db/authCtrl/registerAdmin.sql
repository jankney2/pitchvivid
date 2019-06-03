insert into admins (
  email,
  first_name,
  last_name, 
  hash,
  company_id,
  owner
) values (
  ${email},
  ${firstName},
  ${lastName},
  ${hash},
  ${companyId},
  ${owner}
)

returning *;