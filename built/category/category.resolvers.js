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
var resolvers = {
    Category: {
        totalShops: function (_a, _, _b) {
            var id = _a.id;
            var client = _b.client;
            return client.coffeeShop.count({
                where: {
                    categories: {
                        some: {
                            id: id,
                        },
                    },
                },
            });
        },
        shops: function (_a, _b, _c) {
            var id = _a.id;
            var lastId = _b.lastId;
            var client = _c.client;
            return client.category
                .findUnique({
                where: { id: id },
            })
                .shops(__assign({ take: 5, skip: lastId ? 1 : 0 }, (lastId && { cursor: { id: lastId } })));
        },
    },
};
exports.default = resolvers;
