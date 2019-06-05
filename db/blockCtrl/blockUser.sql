insert into blocked_users (
  user_id,
  banned
) values (
  ${user_id},
  true
)

returning *;