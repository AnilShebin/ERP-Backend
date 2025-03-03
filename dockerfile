# Step 1: Use Node.js base image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port that your app is listening on
EXPOSE 8080

# Step 7: Build the project (if using TypeScript)
RUN npm run build

# Step 8: Command to run your app
CMD ["node", "dist/server.js"]