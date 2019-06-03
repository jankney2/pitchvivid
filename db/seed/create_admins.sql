create table admins (
    id serial primary key,
    email varchar(50) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    hash text not null,
    company_id int,
    foreign key (company_id) references companies (id),
    owner boolean default false
)