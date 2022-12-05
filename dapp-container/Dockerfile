FROM node:18.9.0 AS builder
ENV NODE_ENV production

WORKDIR /app

RUN wget https://github.com/filenko45/starknet-dapp/archive/refs/heads/devnet.zip
RUN unzip devnet.zip
RUN cp -a ./starknet-dapp-devnet/. ./
RUN rm -f devnet.zip && rm -rf starknet-dapp-devnet
RUN yarn install --production
RUN yarn build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html
COPY dapp-container/nginx.conf /etc/nginx/conf.d/default.conf

COPY dapp-container/dapp.key /dapp.key
COPY dapp-container/dapp.crt /dapp.crt

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]