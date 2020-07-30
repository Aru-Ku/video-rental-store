import React from "react";
import styles from "../Styles/UiStyles.module.css";

export const Input = (props) => {
	const [cls, setCls] = React.useState("");
	React.useEffect(() => {
		if (props.warnMsg) {
			setCls(styles.hascontent + " " + styles.inputBorderRed);
		} else if (props.success) {
			setCls(styles.hascontent + " " + styles.inputBorderGreen);
		} else if (props.value) {
			setCls(styles.hascontent);
		}
	}, [props.value, props.success, props.warnMsg]);
	return (
		<span style={props.wrap} className={styles.wrapper + " " + props.spanClass}>
			<input
				type={props.type}
				value={props.value}
				onChange={props.onchange}
				placeholder={props.placeholder}
				className={styles.input + " " + cls + " " + props.inputClass}
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

export const DayInput = ({ id, value, onchange }) => {
	return (
		<div className={styles.dayInputWrapper}>
			Rent for
			<input className={styles.dayInputBox} type='number' value={value} min={1} onChange={onchange} required />
			Days
		</div>
	);
};
