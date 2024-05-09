function middleware(req, res, next) {
  console.log("Logging...");
  next();
}

module.exports = middleware;
