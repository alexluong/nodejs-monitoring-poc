# Stage 1: Base - common setup
FROM node:22-alpine AS base
WORKDIR /usr/src/app
# Copy package.json and lock file
COPY package*.json ./

# Stage 2: Development - install all dependencies, including dev
FROM base AS development
ENV NODE_ENV=development
# Install all dependencies
RUN npm install
# Copy the rest of the application code (will be overlaid by volume mount in dev)
COPY . .
EXPOSE 3000
# Default command for development
CMD ["npm", "run", "start:dev"]

# Stage 3: Builder - for creating production build
FROM base AS builder
# Install all dependencies (needed for 'nest build')
RUN npm install
# Copy the rest of the application source code
COPY . .
# Build the application
RUN npm run build
# Remove dev dependencies after build for a lean node_modules
RUN npm prune --production

# Stage 4: Production - final lean image
FROM node:22-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]