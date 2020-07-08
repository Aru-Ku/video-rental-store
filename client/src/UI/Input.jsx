import React from "react";
import styles from "../Styles/UiStyles.module.css";

export const Input = (props) => {
	const [cls, setCls] = React.useState("");
	React.useEffect(() => {
		if (props.value) {
			setCls(styles.input + " " + styles.hascontent);
		} else if (props.warnMsg) {
			setCls(styles.input + " " + styles.hascontent + " " + styles.inputBorderRed);
		} else if (props.success) {
			setCls(styles.input + " " + styles.hascontent + " " + styles.inputBorderGreen);
		} else {
			setCls(styles.input);
		}
	}, [props.value, props.success, props.warnMsg]);
	return (
		<span style={props.wrap} className={styles.wrapper + " " + props.spanClass}>
			<input
				type={props.type}
				value={props.value}
				onChange={props.onchange}
				placeholder={props.placeholder}
				className={cls + " " + props.inputClass}
				style={props.defaultInputStyle ? props.defaultInputStyle : props.inputStyle}
				onClick={props.onclick}
			/>
			{props.label && (
				<label style={props.labelStyle} className={styles.label}>
					{props.label}
				</label>
			)}
			{props.warnMsg && <p className={styles.warning}>&nbsp;{props.warnMsg}</p>}
		</span>
	);
};
