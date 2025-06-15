# Claude Code Implementation Prompt

## Mission
Set up a simple, practical headless CMS using Strapi + Supabase for the Makimiso website. Focus on getting a working solution quickly without overengineering.

## What You Need to Build

### 1. Docker Setup (Priority 1)
- Create `docker-compose.yml` for Strapi
- Environment configuration for Supabase connection
- Volume mapping for persistent data
- Local development ready

### 2. Strapi Configuration (Priority 1)
- Basic Strapi setup with Supabase PostgreSQL
- Create content types:
  - Blog Post (title, content, excerpt, featured_image, date, tags, slug)
  - Portfolio Item (title, description, images, client, date, technologies, slug)
- Basic API permissions (public read access)

### 3. Environment Setup (Priority 1)
- `.env.example` file with required variables
- Supabase connection configuration
- Clear setup instructions

### 4. API Integration Code (Priority 2)
- Simple JavaScript functions to fetch content from Strapi
- Example integration for existing makimiso.github.io site
- Sample HTML for displaying blog posts and portfolio items

### 5. Documentation (Priority 2)
- Step-by-step setup guide
- How to add content
- How to deploy

## Important Constraints

### DO:
- Keep it simple and functional
- Use standard Strapi features
- Focus on getting it working first
- Create clear documentation
- Use Supabase free tier limits
- Make it easy to run locally with Docker

### DON'T:
- Add complex authentication systems
- Create custom admin interfaces
- Implement advanced workflows
- Add unnecessary plugins
- Over-architect the solution
- Create enterprise-level features

## Technical Specs
- **CMS**: Latest stable Strapi
- **Database**: Supabase PostgreSQL (free tier)
- **Container**: Official Strapi Docker image
- **API**: REST (keep it simple)
- **Integration**: Vanilla JavaScript fetch API

## File Structure to Create
```
makimiso-cms/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── SETUP.md
├── strapi/
│   └── (Strapi will generate this)
├── integration/
│   ├── api.js
│   ├── blog-integration.html
│   └── portfolio-integration.html
└── docs/
    ├── content-management.md
    └── deployment.md
```

## Success Criteria
1. ✅ Strapi runs locally with `docker-compose up`
2. ✅ Connects to Supabase database
3. ✅ Can create/edit blog posts and portfolio items
4. ✅ API returns content in JSON format
5. ✅ Sample integration code works with existing site
6. ✅ Clear documentation for setup and usage

## Context
- User: Jarrett (non-technical but can follow instructions)
- Existing site: Professional static HTML on GitHub Pages
- Goal: Add dynamic content capability without breaking existing site
- Budget: Minimal (free tiers + small hosting cost)

Start with the Docker setup and Supabase connection. Get the basics working first, then we can iterate and improve.
