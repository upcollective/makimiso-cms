# Makimiso CMS Troubleshooting Guide

## Quick Diagnostic Commands

```bash
# Check if CMS is running
curl -f http://localhost:1337/admin || echo "CMS not accessible"

# Test API endpoints
curl -s http://localhost:1337/api/blog-posts | jq '.meta' || echo "Blog API not working"
curl -s http://localhost:1337/api/portfolio-items | jq '.meta' || echo "Portfolio API not working"

# Check container status
docker-compose ps

# View recent logs
docker-compose logs strapi --tail=20
```

## Common Issues & Solutions

### 🚫 API Returns 404 "Not Found"

**Symptoms:**
```json
{"data":null,"error":{"status":404,"name":"NotFoundError","message":"Not Found"}}
```

**Diagnosis Steps:**
1. Check if container is running: `docker-compose ps`
2. Check if content types exist in admin panel
3. Verify API permissions are set

**Solution:**
```bash
# 1. Access admin panel
open http://localhost:1337/admin

# 2. Go to Settings → Roles → Public
# 3. Find "Blog-post" and "Portfolio-item" sections
# 4. Enable 'find' and 'findOne' permissions
# 5. Click Save
```

### 🚫 API Returns 403 "Forbidden"

**Symptoms:**
```json
{"data":null,"error":{"status":403,"name":"ForbiddenError","message":"Forbidden"}}
```

**Root Cause:** API permissions not enabled for public access

**Solution:**
1. Admin panel → Settings → Roles → Public
2. Find the content type (e.g., "Portfolio-item")
3. Check ✅ `find` and ✅ `findOne`
4. Click Save

### 🚫 Content Types Missing from Permissions

**Symptoms:** Only see plugin permissions (Upload, Users-permissions, etc.)

**Root Cause:** Content types created programmatically don't auto-register API routes

**Solution - Recreate Through Admin UI:**
1. Content-Types Builder → Delete existing content type
2. Click "Create new collection type"
3. Add all fields manually
4. Save and restart
5. Content type will now appear in permissions

### 🚫 Container Won't Start

**Check logs first:**
```bash
docker-compose logs strapi
```

**Common Issues:**

**Port already in use:**
```bash
lsof -i :1337
# Kill the process using port 1337
kill -9 <PID>
```

**Volume permission issues:**
```bash
chmod -R 755 strapi-data/
docker-compose restart strapi
```

**Out of disk space:**
```bash
df -h
docker system prune -f
```

### 🚫 Admin Panel Not Loading

**Symptoms:** Browser shows connection refused or timeout

**Diagnosis:**
```bash
# Check if container is running
docker-compose ps

# Check if port is accessible
curl -f http://localhost:1337/admin

# Check logs for errors
docker-compose logs strapi --tail=10
```

**Solutions:**
1. **Container stopped:** `docker-compose up -d`
2. **Still starting:** Wait 2-3 minutes for first-time setup
3. **Port blocked:** Check firewall, try different port
4. **Browser cache:** Clear cache, try incognito mode

### 🚫 Content Not Appearing in API

**Symptoms:** API returns empty array even with published content

**Diagnosis:**
1. Check content status in admin: Content Manager → Blog Posts
2. Verify "Published" toggle is ON
3. Check if using draft vs. published API

**Solution:**
```bash
# Make sure content is published, not just saved as draft
# In admin: Content Manager → Your Content → Published: ON
```

### 🚫 Database Connection Errors

**Symptoms:** 
```
Error: connect ECONNREFUSED
Error: getaddrinfo ENOTFOUND
```

**Current Setup:** Using SQLite (no external database needed)

**If switching to PostgreSQL:**
1. Update `.env` with correct database credentials
2. Install pg module: `npm install pg`
3. Restart container: `docker-compose restart strapi`

## Development Workflow Issues

### 🔄 Changes Not Reflecting

**For Content Types:**
- Changes require container restart: `docker-compose restart strapi`
- Admin UI changes auto-restart Strapi

**For API Integration:**
- No restart needed, changes are immediate
- Clear browser cache if testing in browser

### 🔄 Permission Changes Not Working

**After changing permissions:**
1. Click Save in admin panel
2. Wait 10-30 seconds for changes to apply
3. Test API endpoint again
4. If still not working, restart container

## Performance Issues

### 🐌 Slow API Response

**Diagnosis:**
```bash
time curl -s http://localhost:1337/api/blog-posts
```

**Common causes:**
- First request after restart (cold start)
- Large number of content items
- Heavy images in response

**Solutions:**
- Add pagination: `?pagination[limit]=10`
- Optimize images in admin panel
- Use population selectively

### 🐌 Admin Panel Slow

**Solutions:**
- Clear browser cache
- Restart container: `docker-compose restart strapi`
- Check available disk space: `df -h`

## Container Management

### 🐳 Clean Restart Process
```bash
# Stop everything
docker-compose down

# Clean up (optional)
docker system prune -f

# Start fresh
docker-compose up -d

# Monitor startup
docker-compose logs -f strapi
```

### 🐳 Complete Reset (Nuclear Option)
```bash
# ⚠️ This deletes ALL data
docker-compose down
rm -rf strapi-data/
mkdir strapi-data
docker-compose up -d

# You'll need to recreate admin account and content types
```

### 🐳 Backup Before Changes
```bash
# Backup current state
cp -r strapi-data/ strapi-data-backup-$(date +%Y%m%d)

# Restore if needed
rm -rf strapi-data/
mv strapi-data-backup-YYYYMMDD/ strapi-data/
```

## API Testing Tools

### Basic Testing
```bash
# Test basic connectivity
curl -f http://localhost:1337/admin

# Test API endpoints
curl -s http://localhost:1337/api/blog-posts | jq '.'
curl -s http://localhost:1337/api/portfolio-items | jq '.'
```

### Advanced Testing
```bash
# Test with pagination
curl -s "http://localhost:1337/api/blog-posts?pagination[limit]=5" | jq '.meta'

# Test single item (replace 1 with actual ID)
curl -s http://localhost:1337/api/blog-posts/1 | jq '.data.attributes.title'

# Test population (include related media)
curl -s "http://localhost:1337/api/blog-posts?populate=*" | jq '.data[0].attributes'
```

## Integration Debugging

### 🌐 CORS Issues

**Symptoms:** Browser console shows CORS errors

**Solution:** Update CORS settings in admin:
1. Settings → Advanced → CORS
2. Add your domain to allowed origins
3. Or use wildcard `*` for development

### 🌐 JavaScript Integration Issues

**Test the integration library:**
```javascript
// In browser console
await window.MakimisoCMS.getBlogPosts()
```

**Common issues:**
- API not accessible from frontend domain
- Permissions not set correctly
- Network connectivity issues

## When to Contact Support

**Escalate if:**
- Container consistently fails to start after following all steps
- Data corruption (content disappears unexpectedly)
- Security concerns (unauthorized access)
- Performance severely degraded (>10 second response times)

**Always include:**
- Output of `docker-compose logs strapi`
- Output of `curl -s http://localhost:1337/api/blog-posts`
- Steps you've already tried
- When the issue first appeared

## Emergency Recovery

**If admin panel is completely inaccessible:**
```bash
# Check if there's a backup
ls -la strapi-data-backup-*

# If no backup, try container restart
docker-compose restart strapi

# If still broken, nuclear reset (data loss)
docker-compose down
rm -rf strapi-data/
mkdir strapi-data
docker-compose up -d
```

**Remember:** After nuclear reset, you'll need to:
1. Create new admin account
2. Recreate all content types through admin UI
3. Set API permissions
4. Re-enter all content

This is why regular backups are important!