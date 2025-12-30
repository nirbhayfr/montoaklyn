import { Navigate, Outlet } from "react-router-dom";
import { decryptData } from "./crypto";

export default function ProtectedRoutes({ roles }) {
	const stored = localStorage.getItem("user");
	let user = null;

	if (stored) {
		try {
			user = decryptData(stored);
		} catch {
			user = null;
		}
	}

	// Not logged in
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	// Role not allowed
	if (roles && !roles.includes(user.role)) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
