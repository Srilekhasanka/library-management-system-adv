import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../authentication/auth.service";
import User from "../authentication/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "login";

interface AuthRequest extends Request {
  user?: User;
}

// export default async function protect(
//   req: AuthRequest, // Use the new interface here
//   res: Response,
//   next: NextFunction
// ): Promise<any> {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ status: "fail", message: "Not authenticated" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = verifyToken(token);
//     console.log(decoded);

//     if (typeof decoded === "object" && "id" in decoded) {
//       const userId = (decoded as JwtPayload).id;

//       const user = await User.findByPk(userId);

//       if (!user) {
//         return res
//           .status(401)
//           .json({ status: "fail", message: "User no longer exists" });
//       }

//       req.user = user; // Assign the user object to the request
//       next();
//     }
//   } catch (err) {
//     return res.status(401).json({ status: "fail", message: "Invalid token" });
//   }
// }

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: "fail", message: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Check if user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "User no longer exists" });
    }

    // Grant access to the protected route by attaching user to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};
