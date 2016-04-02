var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var utils = require('../../cores/utilities');
var DistrictsModel = keystone.list('District').model;

exports = module.exports = _.assign(restful(DistrictsModel), {});
