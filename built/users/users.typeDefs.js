"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: Int!\n    email: String!\n    username: String!\n    name: String\n    location: String\n    avatar: String\n    githubUsername: String\n    createdAt: String!\n    updatedAt: String!\n    followers: [User]\n    following: [User]\n    totalFollowing: Int!\n    totalFollowers: Int!\n    isFollowing: Boolean!\n    isMe: Boolean!\n  }\n"], ["\n  type User {\n    id: Int!\n    email: String!\n    username: String!\n    name: String\n    location: String\n    avatar: String\n    githubUsername: String\n    createdAt: String!\n    updatedAt: String!\n    followers: [User]\n    following: [User]\n    totalFollowing: Int!\n    totalFollowers: Int!\n    isFollowing: Boolean!\n    isMe: Boolean!\n  }\n"])));
var templateObject_1;
