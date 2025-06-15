# Railway Dockerfile for Strapi v5
FROM node:18-alpine

WORKDIR /opt/app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all Strapi application files
COPY . ./

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