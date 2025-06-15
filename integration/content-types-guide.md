# Content Types Setup Guide

This guide will help you create the exact content types needed for the Makimiso CMS in Strapi.

## Blog Post Content Type

1. In Strapi admin, go to **Content-Types Builder**
2. Click **Create new collection type**
3. Display name: `Blog Post`
4. Add these fields one by one:

### Fields for Blog Post:

| Field Name | Type | Settings |
|------------|------|----------|
| `title` | Text | Required: Yes |
| `slug` | UID | Required: Yes, Attached field: title |
| `content` | Rich text (Markdown) | Required: Yes |
| `excerpt` | Text | Required: No, Long text: Yes |
| `featured_image` | Media | Required: No, Type: Single media |
| `published_date` | Date & time | Required: No |
| `tags` | JSON | Required: No |
| `category` | Text | Required: No |
| `seo_title` | Text | Required: No |
| `seo_description` | Text | Required: No, Long text: Yes |
| `published` | Boolean | Required: Yes, Default: false |

## Portfolio Item Content Type

1. Create new collection type
2. Display name: `Portfolio Item`
3. Add these fields:

### Fields for Portfolio Item:

| Field Name | Type | Settings |
|------------|------|----------|
| `title` | Text | Required: Yes |
| `slug` | UID | Required: Yes, Attached field: title |
| `description` | Rich text (Markdown) | Required: Yes |
| `short_description` | Text | Required: No, Long text: Yes |
| `images` | Media | Required: No, Type: Multiple media |
| `featured_image` | Media | Required: No, Type: Single media |
| `client` | Text | Required: No |
| `project_date` | Date | Required: No |
| `technologies` | JSON | Required: No |
| `project_url` | Text | Required: No |
| `case_study_content` | Rich text (Markdown) | Required: No |
| `published` | Boolean | Required: Yes, Default: false |

## Setting Up API Permissions

After creating the content types:

1. Go to **Settings** → **Roles** → **Public**
2. Under **Permissions**:
   - Find **Blog Post** → Check `find` and `findOne`
   - Find **Portfolio Item** → Check `find` and `findOne`
3. Click **Save**

This allows public API access to your published content while keeping unpublished content private.

## Example Data Formats

### Blog Post JSON Structure:
```json
{
  "title": "My First Blog Post",
  "slug": "my-first-blog-post",
  "content": "# Welcome\n\nThis is my first blog post...",
  "excerpt": "A brief introduction to my new blog",
  "featured_image": {...}, // Media object
  "published_date": "2024-01-15T10:00:00.000Z",
  "tags": ["web development", "strapi", "cms"],
  "category": "Technology",
  "seo_title": "My First Blog Post - Makimiso",
  "seo_description": "Read about my journey starting a new blog",
  "published": true
}
```

### Portfolio Item JSON Structure:
```json
{
  "title": "E-commerce Website Redesign",
  "slug": "ecommerce-website-redesign",
  "description": "## Project Overview\n\nComplete redesign of an e-commerce platform...",
  "short_description": "Modern e-commerce platform with improved UX",
  "images": [...], // Array of media objects
  "featured_image": {...}, // Media object
  "client": "TechCorp Inc.",
  "project_date": "2024-01-01",
  "technologies": ["React", "Node.js", "PostgreSQL", "Stripe"],
  "project_url": "https://example-client.com",
  "case_study_content": "## Challenge\n\nThe client needed...",
  "published": true
}
```

## Tips for Content Creation

### For Blog Posts:
- Use the **slug** field to create URL-friendly versions of your titles
- **excerpt** is optional - if not provided, the API will generate one from content
- **tags** should be a JSON array: `["tag1", "tag2", "tag3"]`
- Set **published** to `true` when ready to show publicly

### For Portfolio Items:
- **technologies** should be a JSON array: `["React", "CSS", "JavaScript"]`
- Use **featured_image** for grid/card views
- Use **images** for project galleries
- **project_date** helps sort items chronologically
- **short_description** is perfect for preview cards

## Testing Your Content

After creating content:

1. Visit `http://localhost:1337/api/blog-posts` to see all blog posts
2. Visit `http://localhost:1337/api/portfolio-items` to see all portfolio items
3. Test the sample integration at `integration/blog-sample.html`