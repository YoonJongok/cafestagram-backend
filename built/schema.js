"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var load_files_1 = require("@graphql-tools/load-files");
var merge_1 = require("@graphql-tools/merge");
var loadTypes = load_files_1.loadFilesSync(__dirname + "/**/*.typeDefs.*");
var loadResolvers = load_files_1.loadFilesSync(__dirname + "/**/*.resolvers.*");
exports.typeDefs = merge_1.mergeTypeDefs(loadTypes);
exports.resolvers = merge_1.mergeResolvers(loadResolvers);
