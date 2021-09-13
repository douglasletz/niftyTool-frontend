import { styles } from "./style"
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function tokenElement(props) {
	const { data } = props
	return (
		<div style={styles.container}>
			<LazyLoadImage
				style={styles.img}
				src={data.image}
				alt={data.name}
			/>
			<p>{data.name}</p>
		</div>
	)
}
