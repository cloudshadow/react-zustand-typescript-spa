# --- build -------------------------------------------------------------------
FROM oven/bun:1.3-alpine AS build
WORKDIR /app
COPY package.json bun.lock .npmrc* ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# --- runtime -----------------------------------------------------------------
# Static output only -- no Node runtime needed. This is the main operational
# difference from StartKit-SSR (D13/D15).
FROM nginx:alpine
COPY conf/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
