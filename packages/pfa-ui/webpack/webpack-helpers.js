// @flow
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
exports.nodeEnv = nodeEnv;
exports.isProduction = nodeEnv === 'production';

const envBuildPath = process.env.BUILD_PATH || '';

exports.buildPath = path.join(__dirname, '../build', envBuildPath);
exports.appsPath = path.join(__dirname, '../src/apps');
exports.sourcePath = path.join(__dirname, '../src');
exports.projectPath = path.join(__dirname, '../');
