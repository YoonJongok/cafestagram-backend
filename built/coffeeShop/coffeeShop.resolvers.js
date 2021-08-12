"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../client");
var resolvers = {
    CoffeeShop: {
        user: function (_a, _) {
            var userId = _a.userId;
            return client_1.default.user.findUnique({ where: { id: userId } });
        },
        categories: function (_a, _) {
            var id = _a.id;
            return client_1.default.category.findMany({
                where: {
                    shops: {
                        some: {
                            id: id,
                        },
                    },
                },
            });
        },
        photos: function (_a, _b, _c) {
            var id = _a.id;
            var lastId = _b.lastId;
            var client = _c.client;
            return client.coffeeShop
                .findUnique({
                where: { id: id },
            })
                .photos(__assign({ take: 5, skip: lastId ? 1 : 0 }, (lastId && { cursor: { id: lastId } })));
        },
    },
};
exports.default = resolvers;
