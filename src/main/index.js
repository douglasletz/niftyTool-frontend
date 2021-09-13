import { useState, useEffect } from "react"
import { initStore } from "../redux/actioncreators"
import { useSelector, useDispatch } from "react-redux"
import FilterButton from "../component/FilterButton"
import TokenElement from "../component/tokenElement"
import axios from "axios"
import { styles } from "./style"
import { useVisibilityHook } from "react-observer-api"
import SearchBox from "../component/SearchBox"

export default function Main(props) {
	const [elements, setElements] = useState([])
	const sideBarData = useSelector((state) => state)
	const attrTypes = Object.keys(sideBarData)
	const [filter, setFilter] = useState("")
	const dispatch = useDispatch()
	const { setElement, isVisible } = useVisibilityHook()

	let isVisibleAll = true

	useEffect(() => {
		let tokenData = []
		;(async () => {
			let { data } = await axios.get(
				`http://localhost/ethereum/${props.tokenAddr.address}`
			)
			setElements(data)
			tokenData = data
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
			<div>
				<SearchBox setFilter={setFilter} />
				<input
					placeholder="Search Item..."
					value={filter}
					onChange={(event) => setFilter(event.target.value)}
				/>
			</div>
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
								.map((key, index) => {
									isVisibleAll = false
									return (
										<FilterButton title={key} key1={key1} />
									)
								})}
						</>
					)
				})}
			</div>

			<div ref={setElement}>
				{isVisible && (
					<div style={styles.main}>
						{isVisibleAll
							? elements.map(
									(data, index) =>
										data.name
											.toLowerCase()
											.includes(filter.toLowerCase()) && (
											<TokenElement data={data} />
										)
							  )
							: attrTypes.map((key, index) => {
									const checkedData = sideBarData[key]
									const checkedKeys = Object.keys(checkedData)
									return (
										<>
											{checkedKeys
												.filter(
													(key) =>
														checkedData[key]
															.checked === true
												)
												.map((key, index) =>
													checkedData[key].values.map(
														(id, index) =>
															elements[id].name
																.toLowerCase()
																.includes(
																	filter.toLowerCase()
																) && (
																<TokenElement
																	data={
																		elements[
																			id
																		]
																	}
																/>
															)
													)
												)}
										</>
									)
							  })}
					</div>
				)}
			</div>
		</div>
	)
}
