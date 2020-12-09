FROM nginx:1.19-alpine

COPY app/build /usr/share/nginx/html
COPY app-standalone-fragment/dist /usr/share/nginx/html/standalone
COPY app/nginx /etc/nginx/templates
