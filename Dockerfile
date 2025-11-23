# build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* bun.lock* ./
RUN npm install

COPY . .
RUN npm run build

# production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./

ENV PORT=80
ENV BACKEND_HOST=backend
ENV BACKEND_PORT=3001

EXPOSE 80

CMD ["node", "server.js"]
