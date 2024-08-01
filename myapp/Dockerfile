



FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Build the React application
RUN npm run build





# Expose port 80 for the Nginx server
EXPOSE 3000

# Start Nginx server
CMD ["npm", "start"]
