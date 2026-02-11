/**
 * Middleware: CNK Logger
 * Features: Colorized output, Response Time, and Device Detection
 */
const originLogger = () => (req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(0);

    // 1. Date Formatting (DD/MM/YYYY)
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

    // 2. Device Detection (Simple)
    const ua = req.headers["user-agent"] || "";
    let device = "Desktop";
    if (/mobile/i.test(ua)) device = "Mobile";
    if (/tablet/i.test(ua)) device = "Tablet";
    if (/PostmanRuntime/i.test(ua)) device = "Postman";

    // 3. Status Color Logic
    const status = res.statusCode;
    const sColor =
      status >= 500
        ? "\x1b[31m"
        : status >= 400
          ? "\x1b[33m"
          : status >= 200
            ? "\x1b[32m"
            : "\x1b[0m";
    const reset = "\x1b[0m";
    const cyan = "\x1b[36m";
    const magenta = "\x1b[35m";

    // Data points
    const origin = req.headers.origin || req.headers.referer || "no-origin";
    const route = req.originalUrl || req.url;
    const method = req.method;

    // Log Format: 11/02/2026 [Postman] http://localhost:3000 /users GET 200 107ms
    console.log(
      `${cyan}${dateStr}${reset} ${magenta}[${device}]${reset} ${origin} ${route} ${method} ${sColor}${status}${reset} ${timeInMs}ms`,
    );
  });

  next();
};

export default originLogger;
