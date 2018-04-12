let passwordHash = require('password-hash');
module.exports = function(passport, user){
	let User = user;
	let LocalStrategy = require('passport-local').Strategy;

	 passport.serializeUser(function(user, done) {
		done(null, user.id_users);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		User.where('id_users', id).fetch()
		.then(function(model){
			if(model){
				done(null, model.toJSON());
			}
			else{
				done(model.errors, null);
			}
		})
    });

	passport.use('local-signup', new LocalStrategy(
		{
			usernameField : 'email',
			passwrodFiled : 'password',
			passReqToCallback : true
		},

		function(req, email, password, done){
			var generateHash = function(password){
				return passwordHash.generate(password);
			};

			User.where('email', email).fetch()
			.then(result => {
				if(result){
					return done(null, false,{
						message:'Email telah terdaftar'
					});
				}
				else{
					var userPassword = generateHash(password);
					var data = {
						'name' : req.body.name,
				        'email' : req.body.email,
				        'password' : passwordHash.generate(password.replace(/\s/g, '')),
				        'status' : true,
				        'jabatan' : req.body.jabatan
					};

					User(data).save()
					.then(function(model){
						if(model){
							return done(null, model);
						}
					})
				}
			})
		}
	));

	passport.use('local-signin', new LocalStrategy(
		{
		 	usernameField: 'email',
		 	passwordField: 'password',
		  	passReqToCallback: true 
		},

		function(req, email, password, done){
			var isValidPassword = function(userpass, password){
				return passwordHash.verify(password, userpass);
			}
			console.log(email)
			User.where('email', email).fetch()
			.then(model=>{
				let result = model.toJSON();
				console.log(result);
				if(!result){
					console.log('email salah');
					return done(null, false,{
						message: 'Email not found'
					})
				}

				if(!isValidPassword(result.password, password)){
					console.log('password salah');
					return done(null, false, {
						message : 'password salah'
					})
				}
					
				console.log('berhasil');
				return done(null, result);
			})
			.catch(err => {
				console.log(err.stack);
				return done(null, false, {
					message : 'Failed to login'
				})
			})
		}

	))

	
}