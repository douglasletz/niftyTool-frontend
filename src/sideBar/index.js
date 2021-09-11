import React from "react"
import MenuItem from "../component/menuitem"
import { useSelector } from "react-redux"

export default function SideBar() {
	const menuData = useSelector((state) => state)
	const menuKeys = Object.keys(menuData)
	return (
		<div>
			{menuKeys.map((key, index) => (
				<MenuItem data={menuData[key]} title={key} />
			))}
		</div>
	)
}
