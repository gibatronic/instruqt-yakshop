# Instruqt YakShop

Node.js project using NestJS to create a web shop and cli tool.
<br>
[yakshop-instruqt.pdf](./yakshop-instruqt.pdf)

## Setup

```shell
# install dependencies
npm install

# tests
npm run test && npm run test:e2e
```

## YAK‐1

As a Yak Shepherd, I want to be able to read in a XML file that contains data about my herd so that I can query it.

```shell
npm run query config/herd.xml 13
```

## YAK‐2

As a Yak Shepherd I want to be able to query my herd and my current stock using Http ReST services which output JSON data.

```shell
# start the server
npm run start
# localhost:3000/yak-shop 

# get stock
curl localhost:3000/yak-shop/stock/13

# get herd
curl localhost:3000/yak-shop/herd/13
```

## YAK‐3

As a Yak Shepherd I want my customers to be able to buy from my stock using my Http ReST services.

```shell
# start the server
npm run start
# localhost:3000/yak-shop

# post an order
curl -X POST localhost:3000/yak-shop/order/14 \
    -H 'Content-Type: application/json' \
    -d '{ "customer": "Jane Doe", "order": { "milk": 3, "skins": 1 } }'
```
