import React, { useState } from 'react'
import "../Nav/Nav.css"
import { MdSort } from "react-icons/md";
import { FaSortDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import Select from 'react-select'
import Option from 'react-select';

const Nav = ({ filterName, setFilterName, value, onChange, board, options }) => {

    const maxWidth = window.innerWidth

    return (
        <nav className='nav'>
            <ul className='nav__ul'>
                <li className='nav__li nav__li--data'>Дата<MdSort style={{ color: "black", marginLeft: "10px" }} /></li>
                <li className='nav__li nav__li--author'>Автор<MdSort style={{ color: "black", marginLeft: "10px" }} /></li>
                <li className='nav__li nav__li--description' ><input maxLength='15' value={filterName} onChange={e => setFilterName(e.target.value)} className='nav__li__input nav__li nav__li--description' placeholder={maxWidth < 920 ? 'Название' : "Название тикета"} /></li>
                <li className='nav__li nav__li--type'><Select className='nav-filter' isClearable value={value[1]} onChange={onChange[1]} options={options[1]} placeholder="Тип" /></li>
                <li className='nav__li nav__li--status'>
                    <Select placeholder="Статус" isClearable value={value[0]} options={options[0]} onChange={onChange[0]} className='nav-filter'>

                    </Select>
                </li>
            </ul>
        </nav >
    )
}

export default Nav
