# Railway Dockerfile for Strapi v5
FROM node:18-alpine

WORKDIR /opt/app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files from strapi-data directory
COPY strapi-data/package*.json ./

# Install dependencies including pg for PostgreSQL
RUN npm ci --only=production && npm install pg

# Copy all Strapi application files
COPY strapi-data/ ./

# Build Strapi admin panel
RUN npm run build

# Create uploads directory
RUN mkdir -p public/uploads

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:1337/_health || exit 1

# Start Strapi
CMD ["npm", "run", "start"]