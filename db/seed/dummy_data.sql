insert into companies (name, admin_key)values(
'Google Probably',
'googleskey'
);

insert into admins (email, first_name, last_name, hash, company_id, owner)values(
'bob@bob.com', 'bob', 'bobberton', 'bobspassword', 1, true
);

insert into jobs (details, filled, opening_date, closing_date, company_id, admin_id)values(
'a job', false, '07/04/2019', '08/04/2019', 1,1
),
(
'another job', false, '12/12/2019', '12/31/2019', 1,1
);