insert into admin_notes (
  job_id,
  user_id,
  disliked,
  liked,
  notes
) values (
  ${job_id},
  ${user_id},
  ${disliked},
  ${liked},
  ${notes}
)

returning *;