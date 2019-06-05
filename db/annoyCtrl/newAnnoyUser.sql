insert into annoying_users (
  user_id,
  admin_id,
  banned
) values (
  ${user_id},
  ${admin_id},
  ${banned}
)

returning *;