insert into companies (
  name,
  admin_key
) values (
  ${companyName},
  ${adminKey}
)

returning *;