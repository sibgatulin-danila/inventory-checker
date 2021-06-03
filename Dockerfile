# Dockerfile
# Pull official Node.js image from Docker Hub
FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Install dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# Expose container port 3000
EXPOSE 3000
# Run "start" script in package.json
CMD ["npm", "start"]
