update admins
set owner = true
where id = $1; 
update admins
set owner = false
where id = $2