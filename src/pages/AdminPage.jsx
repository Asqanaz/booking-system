import React from "react"
import { Link, useParams } from "react-router-dom"
import Card from "../components/Card"
import { useSelector } from "react-redux"

export default function AdminPage() {
  const { category } = useParams()

  const items = useSelector((state) => state[category])
  return (
    <div className="py-20">
      <div className="max-w-3xl flex flex-col gap-y-4">
        {items?.map(item => (
          <Card data = {item} category = {category} key = {item.id}/>
        ))}
        <Link
          to={`/admin/create/${category}`}
          className="px-6 py-3 bg-blue-700 w-fit text-white hover:bg-blue-800 duration-150"
        >
          Create
        </Link>
      </div>
    </div>
  )
}
