import React from "react";

export default function BackDrop({ close }) {
	return (
		<div
			onClick={close}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "#00000088",
				zIndex: 30,
			}}></div>
	);
}
