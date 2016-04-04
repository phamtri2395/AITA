var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var utils = require('../../cores/utilities');
var WardModel = keystone.list('Ward').model;

exports = module.exports = _.assign(restful(WardModel), {});
