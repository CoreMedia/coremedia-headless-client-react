FROM nginx:1.24-alpine

COPY spark/dist /usr/share/nginx/html
COPY standalone-fragment/dist /usr/share/nginx/html/standalone
COPY spark/nginx /etc/nginx/templates

EXPOSE 8080
HEALTHCHECK --start-period=30s --interval=30s --timeout=3s CMD curl -Lf http://localhost:8080/status || exit 1
