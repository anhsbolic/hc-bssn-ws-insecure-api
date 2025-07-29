# Gunakan image Node.js resmi
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port backend
EXPOSE 3000

# Jalankan app
CMD ["npm", "start"]
