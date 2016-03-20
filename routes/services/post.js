// @capheshift 2015
// Author: tw

var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var PostModel = keystone.list('Post').model;

exports = module.exports = _.assign(restful(PostModel), {
});
