/**
 * Basic Security Headers (Lite Helmet version)
 */
const headers = () => (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains",
  );
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
};

export default headers;
