"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  scalar Upload\n  type EditProfileResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    editProfile(\n      email: String\n      username: String\n      password: String\n      name: String\n      location: String\n      avatar: Upload\n      githubUsername: String\n    ): EditProfileResult!\n  }\n"], ["\n  scalar Upload\n  type EditProfileResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    editProfile(\n      email: String\n      username: String\n      password: String\n      name: String\n      location: String\n      avatar: Upload\n      githubUsername: String\n    ): EditProfileResult!\n  }\n"])));
var templateObject_1;
