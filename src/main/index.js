import { useState, useEffect } from "react"
import { initStore, setCheck } from "../redux/actioncreators"
import { useSelector, useDispatch } from "react-redux"

function ElementItem(props) {
	const { data } = props
	return (
		<div>
			{/* <img src={data.image} /> */}
			<label>{data.name}</label>
		</div>
	)
}

function FilterItem(props) {
	const { title, key1 } = props
	const dispatch = useDispatch()
	return (
		<div onClick={() => dispatch(setCheck({ key1, key2: title }))}>
			{title}
		</div>
	)
}

export default function Main() {
	const [elements, setElements] = useState([])
	const menuData = useSelector((state) => state)
	const menuKeys = Object.keys(menuData)
	const dispatch = useDispatch()
	useEffect(() => {
		const menuData = {
			skin: {
				light: { checked: true, values: [0, 1] },
				dark: { checked: false, values: [1] },
			},
			back: {
				light: { checked: false, values: [0, 1] },
				dark: { checked: false, values: [0] },
			},
		}
		dispatch(initStore(menuData))
		setElements([
			{
				_id: "6139d9dd6c52fc8e1c7a9ec5",
				name: "Pudgy Penguin #0",
				image: "https://api.pudgypenguins.io/penguin/image/0",
				attributes: [
					{
						trait_type: "Background",
						value: "Purple",
					},
					{
						trait_type: "Skin",
						value: "Mint",
					},
					{
						trait_type: "Body",
						value: "Hoodie Pink",
					},
					{
						trait_type: "Face",
						value: "Winking",
					},
					{
						trait_type: "Head",
						value: "Wizard Hat",
					},
				],
				__v: 0,
			},
			{
				_id: "6139d9dd6c52fc8e1c7a9ec6",
				name: "Pudgy Penguin #1",
				image: "https://api.pudgypenguins.io/penguin/image/1",
				attributes: [
					{
						trait_type: "Background",
						value: "Beige",
					},
					{
						trait_type: "Skin",
						value: "Light Gray",
					},
					{
						trait_type: "Body",
						value: "Tribal Necklace",
					},
					{
						trait_type: "Face",
						value: "Beard",
					},
					{
						trait_type: "Head",
						value: "Bowl Cut",
					},
				],
				__v: 0,
			},
		])
	}, [])
	return (
		<div className="container">
			{menuKeys.map((key1, index) => {
				const checkedData = menuData[key1]
				const checkedKeys = Object.keys(checkedData)
				return (
					<div>
						{checkedKeys
							.filter((key) => checkedData[key].checked == true)
							.map((key, index) => (
								<div>
									<FilterItem title={key} key1={key1} />
								</div>
							))}
					</div>
				)
			})}
			{menuKeys.map((key, index) => {
				const checkedData = menuData[key]
				const checkedKeys = Object.keys(checkedData)
				return (
					<div>
						{checkedKeys
							.filter((key) => checkedData[key].checked == true)
							.map((key, index) => (
								<div>
									{checkedData[key].values.map(
										(id, index) => (
											<ElementItem data={elements[id]} />
										)
									)}
								</div>
							))}
					</div>
				)
			})}
			{/* {elements.map((data) => (
				<ElementItem data={data} />
			))} */}
		</div>
	)
}
