select jobs.*,  to_char(jobs.opening_date, 'mm/dd/yyyy') as opening_date, companies.name
from jobs
join companies on companies.id = jobs.company_id
 where filled = false and archived = false; 