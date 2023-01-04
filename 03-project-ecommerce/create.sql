DROP TABLE cccat9.item;
DROP TABLE cccat9.product;
DROP TABLE cccat9.coupon;
DROP TABLE cccat9.order;

create schema cccat9;

create table cccat9.product (
    id_product integer primary key,
    description text,
    price NUMERIC,
    width INTEGER,
    height INTEGER,
    length INTEGER,
    weight NUMERIC,
    currency TEXT
);

insert into cccat9.product(id_product, description, price, width, height, length, weight, currency) values(1, 'A',1000, 100,30,10,3, 'BRL')
insert into cccat9.product(id_product, description, price, width, height, length, weight, currency) values(2, 'B',5000, 50,50,50,22, 'BRL')
insert into cccat9.product(id_product, description, price, width, height, length, weight, currency) values(3, 'C',30,10,10,10,0.9, 'BRL')
insert into cccat9.product(id_product, description, price, width, height, length, weight, currency) values(4, 'D',100, 100,30,10,3, 'USD')

create table cccat9.coupon(
    code text PRIMARY KEY,
    percentage NUMERIC,
    expire_date TIMESTAMP
)

insert into cccat9.coupon (code,percentage,expire_date) values ('VALE20', 20, '2022-12-01T10:00:00')
insert into cccat9.coupon (code,percentage,expire_date) values ('VALE20_EXPIRED', 20, '2022-11-01T10:00:00')

create table cccat9.order (
    id_order serial primary key,
    coupon_code text,
    coupon_percentage numeric,
    code text,
    cpf text,
    email text,
    issue_date TIMESTAMP,
    freight NUMERIC,
    total NUMERIC,
    sequence integer
)

create table cccat9.item (
    id_order integer references cccat9.order (id_order),
    id_product integer references cccat9.product (id_product),
    price numeric,
    quantity integer,
    primary key (id_order, id_product)
)