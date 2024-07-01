# 1st stage : Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# 2nd stage : Production
FROM node:22-alpine

WORKDIR /app

# Copy build artifacts and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Environment variables (optional)
# ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]