# Railway.app Deployment Guide

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and create a new repository named `makimiso-cms`
2. **Push your local code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/makimiso-cms.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your `makimiso-cms` repository**
6. **Railway will automatically detect and deploy**

## Step 3: Add PostgreSQL Database

1. **In your Railway project dashboard**
2. **Click "New Service"**
3. **Select "Database" → "PostgreSQL"**
4. **Railway will provision a free PostgreSQL instance**

## Step 4: Configure Environment Variables

In Railway project → Settings → Environment Variables, add:

```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Generate secure keys (use different values!)
APP_KEYS=your-secure-key-1,your-secure-key-2,your-secure-key-3,your-secure-key-4
API_TOKEN_SALT=your-secure-api-token-salt
ADMIN_JWT_SECRET=your-secure-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-secure-transfer-token-salt

# Database (Railway auto-provides these)
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=false

# CORS for GitHub Pages
CORS_ORIGIN=["https://upcollective.github.io", "https://makimiso.com", "https://www.makimiso.com"]
```

## Step 5: Deploy and Verify

1. **Railway will rebuild and deploy**
2. **Get your app URL**: `https://your-app-name.railway.app`
3. **Visit admin panel**: `https://your-app-name.railway.app/admin`
4. **Create new admin account** (your local account won't transfer)
5. **Recreate content types** through admin UI:
   - Blog Post (title, slug, content, excerpt, featured_image, published_date, tags, published)
   - Portfolio Item (title, slug, description, etc.)
6. **Set API permissions**: Settings → Roles → Public → Enable `find` and `findOne`

## Step 6: Test API

```bash
# Test your deployed API
curl https://your-app-name.railway.app/api/blog-posts
curl https://your-app-name.railway.app/api/portfolio-items
```

## Step 7: Update GitHub Pages Integration

In your `makimiso.github.io` repository:

1. **Add the blog page** (copy from `github-pages-integration/blog-client-side.html`)
2. **Update the CMS_URL** in the JavaScript:
   ```javascript
   const CMS_URL = 'https://your-app-name.railway.app';
   ```
3. **Commit and push** to GitHub Pages

## Troubleshooting

### Deployment Fails
- Check Railway logs: Project → Deployments → Click failed deployment
- Common issue: Missing `npm install pg` for PostgreSQL

### Database Connection Fails  
- Verify environment variables are set correctly
- Check PostgreSQL service is running in Railway

### Admin Panel 404
- Wait 2-3 minutes for full deployment
- Check Railway app logs for errors

### CORS Errors
- Update `CORS_ORIGIN` environment variable
- Include your exact GitHub Pages URL

## Railway Free Tier Limits

- **1GB RAM per service**
- **1GB disk per service** 
- **500 execution hours per month**
- **Unlimited bandwidth**

Perfect for a CMS with moderate traffic!

## Next Steps After Deployment

1. **Create content** through Railway admin panel
2. **Test blog page** on GitHub Pages
3. **Add your custom domain** (optional, paid feature)
4. **Set up backups** (export data regularly)

Your CMS will be accessible at:
- **Admin**: `https://your-app-name.railway.app/admin`
- **API**: `https://your-app-name.railway.app/api/blog-posts`
- **Blog**: `https://upcollective.github.io/blog.html`