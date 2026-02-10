import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

/**
 * Socket Authentication Middleware
 */
const socketAuth = (secret) => {
  return (socket, next) => {
    const token =
      socket.handshake.auth?.token || socket.handshake.headers?.token;

    if (!token) {
      return next(new Error("Authentication error: Token missing"));
    }

    try {
      const decoded = jwt.verify(token, secret || process.env.JWT_SECRET);
      socket.user = decoded; // socket ထဲမှာ user data သိမ်းထားမယ်
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  };
};

/**
 * Socket Initialize လုပ်ခြင်း
 */
export const initSocket = (server, options = {}) => {
  io = new Server(server, {
    cors: {
      origin: options.origin || "*",
    },
    ...options,
  });

  // JWT Middleware ကို အသုံးပြုခြင်း
  if (options.authRequired) {
    io.use(socketAuth(options.jwtSecret));
  }

  return io;
};

/**
 * Initialize ပြီးသား IO object ကို ပြန်ယူခြင်း
 */
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
