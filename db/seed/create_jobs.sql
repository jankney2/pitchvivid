create table jobs (
    id serial primary key,
    details varchar(10000),
    filled boolean default false,
    opening_date date,
    closing_date date,
    company_id int,
    admin_id int,
    archived boolean,
    job_title varchar(100)
    foreign key (company_id) references companies (id),
    foreign key (admin_id) references admins (id)
)