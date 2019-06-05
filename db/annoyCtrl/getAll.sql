select annoying_users.*, users.first_name, users.last_name, users.email
from annoying_users
join users on annoying_users.user_id = users.id
where annoying_users.banned = true and annoying_users.admin_id = ${admin_id};