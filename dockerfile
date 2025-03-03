# Use Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Install Python and build tools
RUN apk add --no-cache --virtual .build-deps build-base python3

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --build-from-source

# Copy the rest of the application files
COPY . .

# Expose the port that your app is listening on
EXPOSE 8080

# Build the project (if using TypeScript)
RUN npm run build

# Command to run your app
CMD ["node", "dist/server.js"]
