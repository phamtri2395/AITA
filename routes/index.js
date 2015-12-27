/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var passport = require('passport');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var FacebookStrategy = require('passport-facebook').Strategy;
// var MongoStore = require('connect-mongo/es5')(session);
var MongoDBStore = require('connect-mongodb-session')(session);

var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

var store = new MongoDBStore({ 
	uri: process.env.MONGO_URI,
	collection: 'my_sessions'
});

// Catch errors 
store.on('error', function(error) {
	console.log('SESSION on error', error);
});

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: process.env.HOST+'/auth/facebook/callback',
		profileFields: ['id', 'birthday', 'displayName', 'profileUrl', 'email', 'gender', 'picture.width(200).height(200)'],
	},
	function(accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		process.nextTick(function () {
			console.log('profile', profile);
			// add user to database

			// To keep the example simple, the user's Facebook profile is returned to
			// represent the logged-in user.  In a typical application, you would want
			// to associate the Facebook account with a user record in your database,
			// and return that user instead.
			return done(null, profile);
		});
	}
));

// Setup Route Bindings
exports = module.exports = function(app) {
	var ensureAuthenticated = function(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	};

	app.use(logger('default'));
	app.use(cookieParser({}));
	app.use(bodyParser());
	app.use(methodOverride());
	// app.use(session({ secret: process.env.SECRET }));
	app.use(session({ 
		secret: process.env.SECRET,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365 // 365 days
		},
		store: store
	}));
	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function(req, res, next) {
		console.log('SESSION', req.session);
		next();
	});

	// facebook login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.locals.user = req.user;
			res.redirect('/');
		}
	);
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	app.get('/account', ensureAuthenticated, function(req, res){
		res.json(req.user);
	});

	// app routes
	app.get('/', routes.views.index);
	app.get('/login', routes.views.login);
	app.get('/dang-nhap', routes.views.login);
	app.get('/dang-ky', routes.views['dang-ky']);
	app.get('/dang-tin', routes.views['dang-tin']);
	app.get('/chi-tiet', routes.views['chi-tiet']);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};
