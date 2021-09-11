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
		width: 300,
	},
	main: {
		display: "flex",
	},
}

export default App
