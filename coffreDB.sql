CREATE DATABASE coffreDB;

USE coffreDB;

CREATE TABLE admin
(
    login    varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    id       int AUTO_INCREMENT
        PRIMARY KEY
);

CREATE TABLE coffre
(
    id     int         NOT NULL,
    closed varchar(12) NOT NULL,
    code   varchar(12) NOT NULL,
    CONSTRAINT coffre_pk
        UNIQUE (id)
);

CREATE TABLE contenu
(
    id          int AUTO_INCREMENT
        PRIMARY KEY,
    description varchar(255) NULL,
    imagedata   longblob     NULL
);

CREATE TABLE user
(
    id       int AUTO_INCREMENT
        PRIMARY KEY,
    login    varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    name     varchar(50) NULL
);

