var _helpers = {};

// Register function, which return the date minused by a mount of days
_helpers.minusDays = function(date, days) {
	var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// Set expire period of posts
_helpers.EXPIRE_PERIOD = 21;

module.exports = _helpers;
