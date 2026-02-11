/**
 * Simple Health Check Response
 */
const health = () => (req, res) => {
  res.status(200).json({
    status: "success",
    timestamp: new Date().toISOString(),
    uptime: process.uptime().toFixed(2) + "s",
    env: process.env.NODE_ENV || "development",
  });
};

export default health;
