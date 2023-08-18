FROM node:18-alpine

# Set the working directory
WORKDIR /app/ui/

# Install dependencies
COPY package*.json /app/ui/

RUN npm install

# Copy your React app files
COPY . /app/ui/

# Build your React app
RUN npm run build

EXPOSE 3000