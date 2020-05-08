FROM node:alpine

WORKDIR /app

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install --no-cache

# Copy application source
# COPY . /app
# Start the application
# CMD ["npm",  "start"]
