#! /bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER molly_admin WITH PASSWORD 'molly';
    CREATE USER molly_server WITH PASSWORD 'molly';
    CREATE DATABASE molly;
    GRANT ALL PRIVILEGES ON DATABASE molly TO molly_server;
    \c molly;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ALTER DATABASE molly OWNER TO molly_admin;
EOSQL
