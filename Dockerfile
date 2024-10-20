# Use the official Node.js image based on Alpine
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install build tools and dependencies
RUN apk add --no-cache make gcc g++ python3 && \
    npm install --unsafe-perm && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["node", "dist/app.js"] 