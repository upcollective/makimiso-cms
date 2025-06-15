// scripts/generate-blog-pages.js
// Place this in your makimiso.github.io repository

const fs = require('fs');
const path = require('path');

// Read blog data fetched from CMS
const blogData = JSON.parse(fs.readFileSync('blog-data.json', 'utf8'));

// Blog post template
const blogPostTemplate = (post) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - Makimiso</title>
    <meta name="description" content="${post.excerpt || ''}">
    <!-- Your existing CSS -->
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <!-- Your existing header/nav -->
    <header>
        <nav>
            <a href="../index.html">Home</a>
            <a href="../blog/index.html">Blog</a>
            <a href="../about.html">About</a>
            <a href="../contact.html">Contact</a>
        </nav>
    </header>

    <main class="blog-post">
        <article>
            <header>
                <h1>${post.title}</h1>
                <time datetime="${post.published_date}">${formatDate(post.published_date)}</time>
                ${post.tags ? `<div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
            </header>
            
            ${post.featured_image ? `<img src="${getCMSImageUrl(post.featured_image)}" alt="${post.title}" class="featured-image">` : ''}
            
            <div class="content">
                ${renderContent(post.content)}
            </div>
        </article>
        
        <nav class="post-nav">
            <a href="index.html">&larr; Back to Blog</a>
        </nav>
    </main>

    <!-- Your existing footer -->
    <footer>
        <p>&copy; 2025 Makimiso. All rights reserved.</p>
    </footer>
</body>
</html>`;

// Blog index template
const blogIndexTemplate = (posts) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Makimiso</title>
    <meta name="description" content="Latest insights and updates from Makimiso">
    <!-- Your existing CSS -->
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <!-- Your existing header/nav -->
    <header>
        <nav>
            <a href="../index.html">Home</a>
            <a href="index.html" class="active">Blog</a>
            <a href="../about.html">About</a>
            <a href="../contact.html">Contact</a>
        </nav>
    </header>

    <main class="blog-index">
        <h1>Latest Posts</h1>
        
        <div class="blog-grid">
            ${posts.map(post => `
                <article class="blog-card">
                    ${post.featured_image ? `<img src="${getCMSImageUrl(post.featured_image)}" alt="${post.title}">` : ''}
                    <div class="blog-card-content">
                        <h2><a href="${post.slug}.html">${post.title}</a></h2>
                        <time datetime="${post.published_date}">${formatDate(post.published_date)}</time>
                        <p>${post.excerpt || ''}</p>
                        ${post.tags ? `<div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
                        <a href="${post.slug}.html" class="read-more">Read More</a>
                    </div>
                </article>
            `).join('')}
        </div>
    </main>

    <!-- Your existing footer -->
    <footer>
        <p>&copy; 2025 Makimiso. All rights reserved.</p>
    </footer>
</body>
</html>`;

// Helper functions
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getCMSImageUrl(mediaObject) {
    if (!mediaObject?.data?.attributes?.url) return '';
    const url = mediaObject.data.attributes.url;
    // Update this with your actual CMS URL
    return url.startsWith('http') ? url : \`\${process.env.CMS_URL || 'http://your-cms-domain.com'}\${url}\`;
}

function renderContent(content) {
    // Convert Strapi blocks content to HTML
    if (!content) return '';
    
    // If content is already HTML string
    if (typeof content === 'string') return content;
    
    // If content is Strapi blocks format
    if (Array.isArray(content)) {
        return content.map(block => {
            switch (block.type) {
                case 'paragraph':
                    return \`<p>\${block.children.map(child => child.text).join('')}</p>\`;
                case 'heading':
                    const level = block.level || 2;
                    return \`<h\${level}>\${block.children.map(child => child.text).join('')}</h\${level}>\`;
                case 'list':
                    const listType = block.format === 'ordered' ? 'ol' : 'ul';
                    const items = block.children.map(item => 
                        \`<li>\${item.children.map(child => child.text).join('')}</li>\`
                    ).join('');
                    return \`<\${listType}>\${items}</\${listType}>\`;
                default:
                    return \`<p>\${JSON.stringify(block)}</p>\`;
            }
        }).join('');
    }
    
    return String(content);
}

// Main function
function generateBlogPages() {
    const posts = blogData.data || [];
    
    // Ensure blog directory exists
    if (!fs.existsSync('blog')) {
        fs.mkdirSync('blog');
    }
    
    // Generate individual blog post pages
    posts.forEach(postData => {
        const post = postData.attributes;
        const html = blogPostTemplate(post);
        fs.writeFileSync(\`blog/\${post.slug}.html\`, html);
        console.log(\`Generated: blog/\${post.slug}.html\`);
    });
    
    // Generate blog index page
    const indexHtml = blogIndexTemplate(posts.map(p => p.attributes));
    fs.writeFileSync('blog/index.html', indexHtml);
    console.log('Generated: blog/index.html');
    
    console.log(\`Generated \${posts.length} blog pages\`);
}

// Run if called directly
if (require.main === module) {
    generateBlogPages();
}

module.exports = { generateBlogPages };