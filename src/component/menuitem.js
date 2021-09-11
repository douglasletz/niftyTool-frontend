import { React, useState } from "react"
import { useDispatch } from "react-redux"
import { setCheck } from "../redux/actioncreators"

function CheckedItem(props) {
	const { data, title, key1 } = props
	const dispatch = useDispatch()
	return (
		<div>
			<label>
				<input
					type="checkbox"
					checked={data.checked}
					onClick={() => dispatch(setCheck({ key1, key2: title }))}
				/>
				{title}
			</label>
			<label>{data.values.length}</label>
		</div>
	)
}

export default function MenuItem(props) {
	const [bContentVisible, setContentVisible] = useState(false)
	const [filter, setFilter] = useState("")
	const checkedData = props.data
	const checkedKeys = Object.keys(checkedData)
	const title = props.title
	return (
		<div className="container">
			<div
				style={styles.menuTitle}
				onClick={() => setContentVisible(!bContentVisible)}
			>
				{title}
			</div>
			{bContentVisible && (
				<div className="content">
					<input
						value={filter}
						onChange={(event) => setFilter(event.target.value)}
					/>
					{checkedKeys
						.filter((key) => key.includes(filter))
						.map((key, index) => (
							<CheckedItem
								data={checkedData[key]}
								title={key}
								key1={title}
							/>
						))}
				</div>
			)}
		</div>
	)
}

const styles = {
	menuTitle: {
		border: "1px solid rgba(0, 0, 0, 0.5)",
		padding: 20,
	},
}
