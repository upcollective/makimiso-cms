# 🔧 Missing PostgreSQL Driver - Need to Install 'pg' Module

## Problem
Strapi v5 is successfully installed but missing the PostgreSQL driver (`pg` module) needed to connect to Supabase.

## Error Details
```
Error: Cannot find module 'pg'
Knex: run
$ npm install pg --save
```

## Root Cause
- Strapi was created with default SQLite configuration
- Our environment variables point to PostgreSQL (Supabase)
- PostgreSQL driver `pg` wasn't installed during setup

## Solution Required
Update the Dockerfile to include PostgreSQL driver installation:

```dockerfile
# Add this to the Dockerfile after npm install
RUN npm install pg --save
```

Or modify the Strapi project creation to include PostgreSQL from the start:
```bash
# Instead of quickstart, use:
npx create-strapi-app@latest . --database=postgres --skip-cloud
```

## Expected Result
After fix:
- ✅ Container starts without errors
- ✅ Connects to Supabase PostgreSQL 
- ✅ Strapi admin accessible at localhost:1337/admin
- ✅ No more restart loops

## Priority: HIGH
Currently blocking - container keeps crashing and restarting.

## Test Commands
After fixing, these should work:
```bash
docker-compose logs -f strapi  # Should show "Server started on port 1337"
curl http://localhost:1337/admin  # Should return admin page
```
