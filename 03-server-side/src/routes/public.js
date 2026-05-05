const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

module.exports = router;
