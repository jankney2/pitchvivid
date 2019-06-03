create table jobs (
    id serial primary key,
    details varchar(10000),
    filled boolean default false,
    opening_date date,
    closing_date date,
    company_id int,
    admin_id int,
    foreign key (company_id) references companies (id),
    foreign key (admin_id) references admins (id)
)