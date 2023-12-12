#! /bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE molly;
    \c molly;
    
    CREATE USER molly_admin WITH PASSWORD 'molly';
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ALTER DATABASE molly OWNER TO molly_admin;
EOSQL
