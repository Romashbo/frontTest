import React, { useState } from 'react'
import "../FormCreate/FormCreate.css"


const FormCreate = ({ setVisible }) => {
    const [appeal, setAppeal] = useState({ date: Date.now(), author: "", type: "Ошибка", nameProblem: "", description: "", status: "В очереди" })
    const createAppeal = async () => {
        if (appeal.author && appeal.nameProblem && appeal.description) {
            await fetch("https://65c73b49e7c384aada6e4d98.mockapi.io/api/v1/board", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ date: appeal.date, author: appeal.author, nameProblem: appeal.nameProblem, description: appeal.description, type: appeal.type, status: appeal.status })
            })
            setAppeal({ date: Date.now(), author: "", type: "", description: "", nameProblem: "", status: "В очереди" })
            window.location.reload()
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setVisible(false)

    }
    function formatTime(d) {
        d = new Date
        const date = d.getDate()
        const month = (d.getMonth() + 1).toString().padStart(2, "0")
        const yaer = d.getFullYear()
        return `${date}.${month}.${yaer}`
    }
    return (
        <form onSubmit={handleSubmit} className='form'>
            <table className='form__table'>
                <tr>
                    <th className='th'>Дата</th>
                    <th className='th'>{formatTime(Date.now())}</th>
                </tr>
                <tr>
                    <th className='th'>Автор</th>
                    <th className='th'><input required minLength="2" maxLength="10" type='text' className='form__input' value={appeal.author} onChange={e => setAppeal({ ...appeal, author: e.target.value })} placeholder='Введите имя' /></th>
                </tr>
                <tr>
                    <th className='th'>Тип обращения</th>
                    <th className='th'>
                        <select className='form__select' onChange={e => setAppeal({ ...appeal, type: e.target.value })} value={appeal.type}>
                            <option defaultValue>Ошибка</option>
                            <option>Замечание</option>
                            <option>Рекомендация</option>
                        </select>
                    </th>
                </tr>
                <tr>
                    <th>Название тикета</th>
                    <th>        <input required maxLength='40' className='form__input' type='text' onChange={e => setAppeal({ ...appeal, nameProblem: e.target.value })} placeholder='Название' value={appeal.nameProblem} /></th>
                </tr>
            </table>
            <hr style={{ marginTop: "20px" }} />
            <div className='form__description'>
                <p>Описание</p>
                <textarea type='text' required onChange={e => setAppeal({ ...appeal, description: e.target.value })} value={appeal.description} placeholder='Опишите проблему'>vfrvf</textarea>
            </div>
            <div className='form__button'>
                <button type='submit' onClick={createAppeal} className='btn'>Отправить</button>
            </div>
        </form>
    )
}

export default FormCreate
