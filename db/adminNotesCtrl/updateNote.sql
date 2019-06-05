update admin_notes
set disliked = ${disliked}, liked = ${liked}, notes = ${notes}
where id = ${id}

returning *;