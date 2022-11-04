FROM node:18.9.0 AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Get dapp repo code
RUN wget https://github.com/myBraavos/starknet-dapp/archive/refs/heads/master.zip
# Unzip it and move to the app root
RUN unzip master.zip
RUN cp -a ./starknet-dapp-master/. ./
# Delete useless files
RUN rm -f master.zip && rm -rf starknet-dapp-master
# Install dependencies and build app
RUN yarn install --production
RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY dapp-container/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]