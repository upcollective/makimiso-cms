# 🤖 Claude Code: Start Here!

## Your Mission
Build a simple, practical Strapi + Supabase CMS for the Makimiso website. Keep it straightforward and functional.

## Project Context
- **Location**: `/Users/jarrettdavis/Documents/Work Projects/Makimiso Projects/makimiso-cms/`
- **Goal**: Add blog/portfolio CMS to existing static website
- **Budget**: Free tiers + minimal hosting ($5-12/month)
- **User**: Jarrett (can follow instructions but not deeply technical)

## What's Already Set Up
✅ Project folder structure  
✅ Requirements documented  
✅ .env.example template  
✅ .gitignore configured  

## Your Task List (in order)

### 1. 🐳 Docker Setup (Start Here!)
Create `docker-compose.yml` that:
- Uses official Strapi image
- Connects to Supabase PostgreSQL 
- Mounts volumes for persistence
- Sets up proper environment variables
- Works for local development

### 2. 📝 Content Types
Create Strapi content types for:
- **Blog Post**: title, slug, content, excerpt, featured_image, date, tags, published
- **Portfolio Item**: title, slug, description, images, client, date, technologies, published

### 3. 🔌 API Integration  
Create simple JavaScript functions to:
- Fetch latest blog posts
- Fetch portfolio items
- Display on existing makimiso.com site

### 4. 📚 Documentation
Write clear setup instructions in `SETUP.md`

## Key Files to Create
1. `docker-compose.yml` (Priority 1)
2. `SETUP.md` (Priority 1) 
3. `integration/api.js` (Priority 2)
4. `integration/blog-sample.html` (Priority 2)
5. `docs/deployment.md` (Priority 3)

## Important Guidelines
- **Keep it simple**: No overengineering
- **Make it work**: Function over perfection
- **Document everything**: Clear instructions for Jarrett
- **Test locally**: Ensure `docker-compose up` works

## Success Criteria
When you're done, Jarrett should be able to:
1. Run `docker-compose up` and see Strapi admin
2. Create a blog post through the Strapi interface
3. Fetch that content via API call
4. Follow your instructions to deploy

## Questions? 
Check the other files in this folder:
- `README.md` - Project overview
- `REQUIREMENTS.md` - Technical specs  
- `CLAUDE_CODE_PROMPT.md` - Detailed instructions

**Start with the Docker setup and get Strapi running locally!** 🚀
