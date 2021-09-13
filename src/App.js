import SideBar from "./sideBar"
import Main from "./main"

function App() {
	return (
		<div className="App">
			<div style={styles.container}>
				<div style={styles.sidebar}>
					<SideBar />
				</div>
				<div style={styles.main}>
					<Main />
				</div>
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: "flex",
		flexDirection: "row",
	},
	sidebar: {
		minWidth: 300,
		height: window.innerHeight,
		position: "fixed",
		overflowY: "auto",
		paddingRight: 10,
		borderRight: "1px solid #ddd",
	},
	main: {
		display: "flex",
		marginLeft: 350,
	},
}

export default App
