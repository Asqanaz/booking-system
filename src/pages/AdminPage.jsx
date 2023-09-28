import React from "react"
import { Link, useParams } from "react-router-dom"
import Button from "../ui/Button"
import { defineTheField } from "../utils/defineTheField"
import Card from "../components/Card"
import { getItem } from "../utils/getItem"

export default function AdminPage() {
  const { category } = useParams()

  const items = getItem(category)
  return (
    <div className="py-20">
      <div className="max-w-3xl flex flex-col gap-y-4">
        {items?.map(item => (
          <Card data = {item} category = {category}/>
        ))}
        <Link
          to={`/admin/${category}/create`}
          className="px-6 py-3 bg-blue-700 w-fit text-white hover:bg-blue-800 duration-150"
        >
          Create
        </Link>
      </div>
    </div>
  )
}
