import React, { useState } from 'react';
import './CustomSelect.scss';

export default function CustomSelect({ id, label, defaultValue, options, value, changeValue, disabled, padding }) {

	const [optionsOpen, setOptionsOpen] = useState(false);

	return (
		<div onMouseLeave={e => { e.stopPropagation(); setOptionsOpen(false); }} className="custom-select__container" style={{ opacity: disabled ? 0.6 : 1 }}>
			<input value={value ? value.Name : defaultValue} onClick={() => setOptionsOpen(true)} className={"custom-select__input " + (label ? "custom-select__input--with-label" : "")} type="text" readOnly style={{ paddingLeft: padding ? padding + 'px' : 'initial' }} />
			<i className="custom-select__icon fas fa-caret-down"></i>
			{label && <label className="custom-select__label">{label}</label>}
			{(options && optionsOpen && !disabled) && <div className="custom-select__options">
				<span onClick={() => { changeValue(id, 0); setOptionsOpen(false); }}>{defaultValue}</span>
				{options.map(option => (
					<span onClick={() => { changeValue(id, option); setOptionsOpen(false); }} key={id + option.ID}>{option.Name}</span>
				))}
			</div>}
		</div>
	)

}