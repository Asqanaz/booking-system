import React from "react"
import { Link, Outlet } from "react-router-dom"
import { ADMIN_ROUTES } from "../routes/adminRoutes"

export default function AdminLayout() {
  return (
    <div className="flex gap-x-20">
      <aside className="sticky left-0 top-0 max-w-[320px] w-1/4 h-screen overflow-y-auto bg-neutral-300 flex flex-col">
        {ADMIN_ROUTES.map(({ title, path }) => (
          <Link to = {`/admin/${path}`}className="w-full py-8 text-center cursor-pointer duration-300 hover:bg-neutral-500">
            <span className="text-2xl font-semibold">{title}</span>
          </Link>
        ))}
      </aside>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}
