FROM node:alpine

WORKDIR /app

# Copy the package.json to workdir
COPY package.json .

RUN npm install 

# Copy application source
# COPY . /app
# Start the application
# CMD ["npm",  "start"]
