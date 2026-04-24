FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the Vite port
EXPOSE 5173

# Start the dev server with host flag to allow external connections
CMD ["npm", "run", "dev", "--", "--host"]
