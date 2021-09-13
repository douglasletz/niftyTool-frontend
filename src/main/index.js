import { useState, useEffect } from "react"
import { initStore } from "../redux/actioncreators"
import { useSelector, useDispatch } from "react-redux"
import FilterButton from "../component/FilterButton"
import TokenElement from "../component/tokenElement"
import axios from "axios"
import { styles } from "./style"
import { LazyLoad } from "react-observer-api"

export default function Main() {
	const [elements, setElements] = useState([])
	const sideBarData = useSelector((state) => state)
	const attrTypes = Object.keys(sideBarData)
	const dispatch = useDispatch()
	useEffect(() => {
		let tokenData = []
		;(async () => {
			let { data } = await axios.get(
				"http://localhost/ethereum/0xbd3531da5cf5857e7cfaa92426877b022e612cf8"
			)
			setElements(data)
			tokenData = data

			console.log(tokenData)
			const sideBarStore = {}
			tokenData.map((item, index) => {
				item.attributes.map((attr) => {
					sideBarStore[attr.trait_type] =
						sideBarStore[attr.trait_type] ?? {}

					sideBarStore[attr.trait_type][attr.value] = sideBarStore[
						attr.trait_type
					][attr.value] ?? { checked: false, values: [] }

					sideBarStore[attr.trait_type][attr.value].values.push(index)
					return 0
				})
				return 0
			})

			dispatch(initStore(sideBarStore))
		})()
	}, [])
	return (
		<div className="container">
			<div style={styles.main}>
				{attrTypes.map((key1, index) => {
					const checkedData = sideBarData[key1]
					const checkedKeys = Object.keys(checkedData)
					return (
						<>
							{checkedKeys
								.filter(
									(key) => checkedData[key].checked === true
								)
								.map((key, index) => (
									<FilterButton title={key} key1={key1} />
								))}
						</>
					)
				})}
			</div>

			<LazyLoad>
				<div style={styles.main}>
					{attrTypes.map((key, index) => {
						const checkedData = sideBarData[key]
						const checkedKeys = Object.keys(checkedData)
						return (
							<>
								{checkedKeys
									.filter(
										(key) =>
											checkedData[key].checked === true
									)
									.map((key, index) =>
										checkedData[key].values.map(
											(id, index) => (
												<TokenElement
													data={elements[id]}
												/>
											)
										)
									)}
							</>
						)
					})}
				</div>
			</LazyLoad>

			{/* {elements.map((data) => (
				<tokenElement data={data} />
			))} */}
		</div>
	)
}
