function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {
		return res.redirect('/usuarios/login');  // Si no esta logueado redirige al login
	}
	next();
}

module.exports = authMiddleware;