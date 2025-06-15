# Makimiso CMS Project

## Overview
Adding a simple, cost-effective headless CMS to the existing Makimiso website (www.makimiso.com) for blog and portfolio functionality.

## Current Setup
- **Main Website**: Static HTML site hosted on GitHub Pages
- **Domain**: www.makimiso.com
- **Repository**: https://github.com/upcollective/makimiso.github.io
- **Current Pages**: Home, About, Services, Contact

## Technical Goals
- **CMS**: Strapi (self-hosted, open-source)
- **Database**: Supabase (free tier)
- **Deployment**: Docker containers
- **Integration**: API-based content fetching for existing site
- **Budget**: Stay within free tiers + minimal hosting costs ($5-12/month)

## Content Types Needed
1. **Blog Posts**
   - Title, content, excerpt, featured image
   - Publication date, tags, categories
   - SEO metadata

2. **Portfolio Items**
   - Project title, description, images
   - Client, date, technologies used
   - Case study content

3. **Team/About Content** (optional)
   - Team member profiles
   - Company updates

## Project Structure
```
makimiso-cms/
├── docker/              # Docker configuration
├── strapi/              # Strapi configuration
├── integration/         # API integration code
├── docs/               # Documentation
└── env/                # Environment files (gitignored)
```

## Implementation Phases
1. **Backend Setup**: Strapi + Supabase connection
2. **Content Modeling**: Create content types
3. **API Integration**: Connect to existing website
4. **Deployment**: Docker hosting setup

## Key Requirements
- Keep it simple and practical
- Avoid overengineering
- Maintain existing site structure
- Enable easy content management
- Self-hosted and controlled
