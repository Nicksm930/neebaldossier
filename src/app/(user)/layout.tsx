'use client'; // ⬅️ Make Layout a client component

import { redirect, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import "../globals.css";


export default function UserLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const query = useSearchParams();
  const { id } = params; // 🔥 Get dynamic id from route
  const user_role = query.get("user-role");
  const logoutHandler = () => {
    localStorage.removeItem("user");
    redirect(`/`);
  };
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <div className="min-h-screen bg-gray-100">
          {/* User Dashboard Header */}
          <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-700">
                User Dashboard
              </h1>
              <nav>
                <ul className="flex space-x-6 text-gray-600 font-medium">
                  <li className="hover:text-blue-600">
                    <Link href={`/user/${id}?user-role=${user_role}`}>
                      Home
                    </Link>
                  </li>
                  <li className="hover:text-blue-600">
                    <Link href={`/user/${id}/dossiers?user-role=${user_role}`}>
                      My Dossiers
                    </Link>
                  </li>
                  <li className="hover:text-blue-600">
                    <Link href={`/user/${id}/profile`}>Profile</Link>
                  </li>
                  <li className="hover:text-blue-600">
                    <Link href={`/user/${id}/aisearch?user-role=${user_role}`}>
                      AI Search
                    </Link>
                  </li>
                  <li className="hover:text-blue-600">
                    <button onClick={logoutHandler}>Logout</button>
                    {/* Optional: handle logout properly */}
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
