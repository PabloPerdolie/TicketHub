-- liquibase formatted sql

-- changeSet Danil:2
alter table person add column role varchar;
-- rollback alter table person drop column role;