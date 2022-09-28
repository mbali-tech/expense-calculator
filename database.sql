create table user (
    id serial primary key,
    name text not null
   
    
);

create table category (
    id serial primary key,
    name text not null
    
    
);

create table expenses (
    id SERIAL PRIMARY KEY,
    amount text not null,
    users_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(users_id) REFERENCES users(id),
    FOREIGN KEY(category_id) REFERENCES category(id)
    
);

insert into category (name) values ('food'),('transport'),('Communication'),('Toiletries');