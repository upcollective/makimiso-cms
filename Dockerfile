# Dockerfile for Strapi v4 with Node.js 18
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=development

# Set working directory
WORKDIR /opt/app

# Copy package.json and package-lock.json if they exist
COPY package*.json ./

# Install Strapi globally
RUN npm install -g @strapi/strapi@latest

# Install PostgreSQL driver globally for availability
RUN npm install -g pg

# Create app directory structure
RUN mkdir -p /opt/app

# Set proper permissions
RUN chown -R node:node /opt/app
USER node

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:1337/admin || exit 1

# Default command - will be overridden by docker-compose
CMD ["strapi", "develop"]