"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type CreateCoffeeShopResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    createCoffeeShop(\n      name: String!\n      latitude: String\n      longitude: String\n      file: Upload\n      caption: String\n    ): CreateCoffeeShopResult!\n  }\n"], ["\n  type CreateCoffeeShopResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    createCoffeeShop(\n      name: String!\n      latitude: String\n      longitude: String\n      file: Upload\n      caption: String\n    ): CreateCoffeeShopResult!\n  }\n"])));
var templateObject_1;
