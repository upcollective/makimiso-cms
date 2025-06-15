# Technical Requirements for Makimiso CMS

## Current Website Context
- **Repository**: https://github.com/upcollective/makimiso.github.io
- **Live Site**: www.makimiso.com
- **Tech Stack**: Static HTML, CSS, JavaScript
- **Hosting**: GitHub Pages
- **Structure**: 
  - index.html (homepage)
  - about.html 
  - services.html
  - contact.html
  - assets/ (images, CSS, JS)

## Content Management Needs

### Blog Posts
```json
{
  "title": "String (required)",
  "slug": "String (auto-generated from title)",
  "content": "RichText (required)", 
  "excerpt": "Text (optional)",
  "featured_image": "Media (optional)",
  "published_date": "DateTime",
  "tags": "JSON (array of strings)",
  "category": "String (optional)",
  "seo_title": "String (optional)",
  "seo_description": "Text (optional)",
  "published": "Boolean (default: false)"
}
```

### Portfolio Items  
```json
{
  "title": "String (required)",
  "slug": "String (auto-generated)",
  "description": "RichText (required)",
  "short_description": "Text (for previews)",
  "images": "Media (multiple)",
  "featured_image": "Media",
  "client": "String (optional)",
  "project_date": "Date",
  "technologies": "JSON (array of strings)",
  "project_url": "String (optional)",
  "case_study_content": "RichText (optional)",
  "published": "Boolean (default: false)"
}
```

## Supabase Configuration
- **Free Tier Limits**: 
  - 500MB database storage
  - 5GB bandwidth per month
  - Up to 50,000 monthly active users
- **Database**: PostgreSQL
- **Connection**: Standard postgres connection string

## Docker Requirements
- Use official Strapi Docker image
- Persistent volumes for uploads and data
- Environment variables for configuration
- Development-friendly (auto-reload)
- Production-ready configuration option

## API Integration Points
For the existing website, we need simple JavaScript to:

1. **Homepage**: Display 3 latest blog posts
2. **New Blog Page**: List all published blog posts  
3. **New Portfolio Page**: Display portfolio grid
4. **Individual Post/Portfolio Pages**: Single item views

## Hosting Considerations
- **Development**: Local Docker setup
- **Production**: Small VPS (DigitalOcean, Linode)
- **Database**: Supabase (managed PostgreSQL)
- **Media Storage**: Local filesystem or Supabase Storage

## Security & Access
- **Admin Access**: Basic Strapi admin (Jarrett only)
- **API Access**: Public read for published content
- **No user registration**: Closed system for content management

## Performance Targets
- **API Response**: < 500ms for content queries
- **Admin Interface**: Responsive on standard broadband
- **Resource Usage**: Minimal (suitable for $5-12/month VPS)

## Integration with Existing Site
- **Method**: Fetch API calls from existing pages
- **Fallback**: Graceful degradation if API unavailable  
- **SEO**: Ensure content is crawlable
- **Styling**: Match existing Makimiso design system
