FROM node:18-alpine

# Set the working folder inside the container
WORKDIR /app

# Copy package.json and package-lock.json so we can install dependencies first
COPY package*.json ./

# Install all the project dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# For running in Prod mode:

# Build the app for production
RUN npm run build

# Install 'serve' globally so we can serve the production build
RUN npm install -g serve

# Make port 3000 available for the app
EXPOSE 3000

# Start the app using 'serve' to host the production build
CMD ["serve", "-s", "dist", "-l", "3000"]

