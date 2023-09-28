import React from "react"
import Button from "../ui/Button"
import { Link } from "react-router-dom"

export default function Card({ category, data }) {
  return (
    <div className="w-full flex gap-x-3">
      <div className="w-[80%] rounded-2xl bg-rose-300 h-[64px] py-3 flex items-center justify-center">
        <span>
          {data.name ||
            data.professional?.name +
              " " +
              data.service?.name +
              " " +
              data.start}
        </span>
      </div>
      <Link to={`/admin/view/${category}/${data.id}`}>View Details</Link>
      <Button
        variant={"secondary"}
        onClick={() => {}}
      >
        Delete
      </Button>
    </div>
  )
}
