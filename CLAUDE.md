# Makimiso CMS - Assistant Instructions

## 🔴 CRITICAL: This is the LIVE CMS BACKEND
**Changes to this system affect the live blog on makimiso.com**

## 📁 CMS Information
- **Local Path**: `/Users/jarrettdavis/Documents/Work Projects/Makimiso Projects/makimiso-cms/`
- **Platform**: Strapi CMS
- **Hosting**: Railway
- **Live URL**: https://makimiso-cms-production.up.railway.app
- **Admin Panel**: https://makimiso-cms-production.up.railway.app/admin
- **API Base**: https://makimiso-cms-production.up.railway.app/api

## 🏗️ CMS Architecture

### Content Types
```
├── blog-post/           # Blog posts for website
│   ├── title           # Post title
│   ├── slug            # URL-friendly identifier
│   ├── content         # Rich text content (array format)
│   ├── excerpt         # Short description
│   ├── featured_image  # Post thumbnail
│   ├── author          # Author name
│   ├── tags            # Category tags
│   └── publishedAt     # Publication date
└── portfolio-item/      # Future portfolio content
```

### API Structure
```
GET /api/blog-posts?populate=*
├── data[]
│   ├── id              # Numeric ID
│   ├── documentId      # String identifier (use for URLs)
│   └── attributes
│       ├── title
│       ├── content[]   # Rich text blocks
│       ├── featured_image[]
│       └── ...other fields
```

## 🔧 Development Setup

### Local Development
```bash
# Navigate to CMS directory
cd "/Users/jarrettdavis/Documents/Work Projects/Makimiso Projects/makimiso-cms"

# Install dependencies
npm install

# Start development server
npm run develop

# Access admin at http://localhost:1337/admin
```

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection (Railway managed)
- **JWT_SECRET**: Authentication secret
- **ADMIN_JWT_SECRET**: Admin authentication
- **APP_KEYS**: Application encryption keys

## 🚀 Deployment

### Railway Deployment
- **Auto-deploy**: Connected to Railway
- **Config File**: `railway.toml`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Deployment Process
1. Make changes to CMS code
2. Commit and push to repository
3. Railway automatically builds and deploys
4. Changes are live within 2-3 minutes

## 📝 Content Management

### Adding Blog Posts
1. Access admin panel: https://makimiso-cms-production.up.railway.app/admin
2. Navigate to Content Manager > Blog Posts
3. Click "Create new entry"
4. Fill in required fields:
   - **Title**: Post headline
   - **Slug**: URL-friendly version (auto-generated)
   - **Content**: Rich text content
   - **Excerpt**: Brief summary for listing page
   - **Featured Image**: Upload thumbnail image
   - **Author**: Author name
   - **Tags**: Relevant categories
5. Save and publish

### Content Guidelines
- **Title**: Clear, descriptive, SEO-friendly
- **Content**: Use rich text editor for formatting
- **Images**: Upload high-quality images (recommended: 800x400px)
- **Excerpt**: 1-2 sentences summarizing the post
- **Tags**: Use consistent naming (e.g., "Design", "Research", "Innovation")

## 🔌 Website Integration

### Blog Display
- **Blog List**: makimiso.com/blog.html fetches from `/api/blog-posts?populate=*`
- **Individual Posts**: blog-post.html uses `documentId` for URLs
- **Real-time**: Changes in CMS appear on website immediately

### Image Handling
- Images uploaded to CMS are served from Railway
- Website automatically constructs image URLs
- Multiple sizes generated (thumbnail, small, medium, large)

## 🧩 File Structure

### Key Directories
```
├── config/              # Strapi configuration
├── src/
│   ├── api/
│   │   ├── blog-post/   # Blog post content type
│   │   └── portfolio-item/ # Portfolio content type
│   └── admin/           # Admin panel customization
├── database/            # Database migrations
├── public/              # Static files and uploads
└── uploads/             # Media files
```

### Configuration Files
- `config/database.ts`: Database connection
- `config/server.ts`: Server settings
- `config/admin.ts`: Admin panel config
- `config/api.ts`: API settings

## 🔒 Security & Access

### Admin Access
- Admin panel requires authentication
- Create admin users through panel
- Use strong passwords
- Limit admin access to necessary users

### API Security
- Public read access for blog posts
- Admin authentication required for modifications
- CORS configured for makimiso.com

## 🐛 Troubleshooting

### Common Issues

#### CMS Not Loading
1. Check Railway deployment status
2. Verify environment variables
3. Check database connection
4. Review deployment logs

#### Blog Posts Not Appearing on Website
1. Verify posts are published (not draft)
2. Check API endpoint response
3. Verify CORS settings
4. Check website console for errors

#### Image Upload Issues
1. Check file size limits
2. Verify supported formats (JPG, PNG, WebP)
3. Check storage permissions
4. Review upload directory permissions

### Debugging
```bash
# Check Railway logs
railway logs

# Local development logs
npm run develop

# Database connection test
# (Check in Railway dashboard)
```

## 📋 Maintenance Tasks

### Regular Maintenance
- Monitor Railway resource usage
- Review and clean up unused media files
- Update Strapi version periodically
- Backup database regularly (Railway handles this)

### Content Management
- Archive old posts if needed
- Optimize images before upload
- Maintain consistent tagging
- Review and update content regularly

## ⚠️ Important Notes

### DO NOT
- Modify database structure without testing
- Delete content types without backup
- Change API endpoints (will break website)
- Disable CORS for makimiso.com
- Remove required fields from blog-post model

### ALWAYS
- Test changes in development first
- Keep admin credentials secure
- Monitor deployment after changes
- Maintain backup procedures
- Document any structural changes

## 🔄 API Reference

### Get All Blog Posts
```
GET /api/blog-posts?populate=*
Response: { data: [...], meta: {...} }
```

### Get Single Blog Post
```
GET /api/blog-posts/{documentId}?populate=*
Response: { data: {...}, meta: {...} }
```

### Filter by DocumentId
```
GET /api/blog-posts?filters[documentId][$eq]={documentId}&populate=*
Response: { data: [...], meta: {...} }
```

## 📞 Support

### Technical Issues
- **Paolo Austria**: paolo@makimiso.com
- **Jarrett Davis**: jarrett@makimiso.com

### Railway Support
- Railway dashboard: https://railway.app
- Documentation: https://docs.railway.app

---

**Last Updated**: June 2025
**Assistant Note**: This CMS powers the live blog. Handle with care.