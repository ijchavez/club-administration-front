# Compilernode --version
FROM node:16.14.2 as node
WORKDIR /app
COPY ./ /app/
RUN npm cache clean --force && npm install --legacy-peer-deps
RUN npm run build-prod

# Runner
FROM nginx:latest
COPY --from=node /app/dist/club-administration-front /usr/share/nginx/html
