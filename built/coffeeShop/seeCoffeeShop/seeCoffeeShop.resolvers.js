"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        seeCoffeeShop: function (_, _a, _b) {
            var id = _a.id;
            var client = _b.client;
            return client.coffeeShop.findUnique({
                where: {
                    id: id,
                },
            });
        },
    },
};
exports.default = resolvers;
