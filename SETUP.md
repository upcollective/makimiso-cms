# Makimiso CMS Setup Guide

## Prerequisites
- Docker and Docker Compose installed
- Supabase account (free tier)
- Basic command line familiarity

## Step 1: Configure Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings → Database
3. Note down your connection details:
   - Host: `your-project-ref.supabase.co`
   - Database name: `postgres`
   - Username: `postgres`
   - Password: (the one you set during project creation)

## Step 2: Configure Environment Variables

1. Open the `.env` file in this directory
2. Replace the placeholder values with your Supabase credentials:
   ```
   DATABASE_HOST=your-project-ref.supabase.co
   DATABASE_PASSWORD=your-actual-supabase-password
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```
3. You can find your Supabase URL and keys in Settings → API

## Step 3: Start the CMS

1. Open terminal in this directory
2. Run: `docker-compose up -d --build`
3. Wait for the container to build and start (first time takes 5-10 minutes)
4. Monitor progress with: `docker-compose logs -f strapi`
5. When installation completes, open your browser to `http://localhost:1337/admin`
6. Create your admin account when prompted

**Note**: The setup now uses Strapi v5 with Node.js 18 for better performance and compatibility.

## Step 4: Create Content Types

### Blog Post Content Type
1. In Strapi admin, go to Content-Types Builder
2. Create new Collection Type: "Blog Post"
3. Add these fields:
   - `title` (Text, required)
   - `slug` (UID, target field: title)
   - `content` (Rich Text, required)
   - `excerpt` (Text)
   - `featured_image` (Media, single)
   - `published_date` (DateTime)
   - `tags` (JSON)
   - `published` (Boolean, default: false)
4. Save and restart when prompted

### Portfolio Item Content Type
1. Create new Collection Type: "Portfolio Item"
2. Add these fields:
   - `title` (Text, required)
   - `slug` (UID, target field: title)
   - `description` (Rich Text, required)
   - `short_description` (Text)
   - `images` (Media, multiple)
   - `featured_image` (Media, single)
   - `client` (Text)
   - `project_date` (Date)
   - `technologies` (JSON)
   - `project_url` (Text)
   - `published` (Boolean, default: false)
3. Save and restart when prompted

## Step 5: Configure API Permissions

1. Go to Settings → Roles → Public
2. For both "Blog Post" and "Portfolio Item":
   - Enable "find" and "findOne" permissions
   - This allows public API access to published content

## Step 6: Test Your Setup

1. Create a test blog post through the Strapi admin
2. Publish it by setting `published` to true
3. Test the API by visiting:
   - `http://localhost:1337/api/blog-posts`
   - `http://localhost:1337/api/portfolio-items`

## API Endpoints

Your CMS will provide these endpoints:
- `GET /api/blog-posts` - List all published blog posts
- `GET /api/blog-posts/{id}` - Get specific blog post
- `GET /api/portfolio-items` - List all published portfolio items
- `GET /api/portfolio-items/{id}` - Get specific portfolio item

## Integration with Makimiso.com

Use the JavaScript files in the `integration/` folder to connect your existing website to this CMS.

## Troubleshooting

### Container won't start
- Check your `.env` file for correct Supabase credentials
- Ensure Docker is running
- Run `docker-compose logs strapi` to see error details
- First-time setup takes 5-10 minutes to install dependencies

### Can't connect to database
- Verify Supabase project is active
- Check your password and connection details
- Ensure Supabase allows connections from your IP

### Admin panel not loading
- Wait 2-3 minutes for first startup
- Check `http://localhost:1337/admin` (not just `localhost:1337`)
- Clear browser cache if needed

## Commands

- Start CMS: `docker-compose up -d`
- Stop CMS: `docker-compose down`
- View logs: `docker-compose logs -f strapi`
- Restart: `docker-compose restart`