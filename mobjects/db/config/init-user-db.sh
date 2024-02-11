#! /bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE mobjects;
    \c mobjects;
    
    CREATE USER mobjects_admin WITH PASSWORD 'mobjects';
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ALTER DATABASE mobjects OWNER TO mobjects_admin;
EOSQL
