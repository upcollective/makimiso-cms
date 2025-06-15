# 🔄 Missing Strapi Project Creation Step

## Problem
Container installs Strapi v5 globally but never creates a project. Then tries to run `npm run develop` in empty directory.

## Error Pattern
```
Starting Strapi v5 with PostgreSQL...
npm error Missing script: "develop"
```

## Root Cause
The Docker startup sequence is missing the project creation step:

**Current (broken):**
1. ✅ Install Strapi globally
2. ❌ Try `npm run develop` (no project exists)

**Should be:**
1. ✅ Install Strapi globally  
2. ✅ **Create Strapi project**: `npx create-strapi-app@latest . --quickstart --no-run`
3. ✅ **Install PostgreSQL driver**: `npm install pg`
4. ✅ Run `npm run develop`

## Solution Required
Update the Docker startup command to:
```bash
# Check if package.json exists, if not create project
if [ ! -f "package.json" ]; then
  echo "Creating new Strapi project..."
  npx create-strapi-app@latest . --quickstart --no-run
  npm install pg
fi
npm run develop
```

## Expected Result
- ✅ Strapi project created in /opt/app
- ✅ package.json with "develop" script exists
- ✅ `npm run develop` works
- ✅ Server starts on port 1337

## Priority: HIGH
Container keeps restarting - needs project creation step added.
