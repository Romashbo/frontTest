import React from 'react'
import cl from "../Posts/Board.module.css"
import { useNavigate } from 'react-router-dom'

const BoardList = ({ board, remove }) => {

    const rootClasses = [cl.myBoard]
    if (board.status === "Готово") {
        rootClasses.push(cl.green)
    }
    if (board.status === "В работе") {
        rootClasses.push(cl.red)
    }
    if (board.status === "В очереди") {
        rootClasses.push(cl.orange)
    }

    function formatTime(d) {
        d = new Date(board.date)
        const date = d.getDate()
        const month = (d.getMonth() + 1).toString().padStart(2, "0")
        const yaer = d.getFullYear()
        return `${date}.${month}.${yaer}`
    }

    const router = useNavigate()
    function handleClick() {
        router(`/board/${board.id}`)
    }

    return (
        <table key={board.id} className='post'>
            <tr onClick={handleClick} className='post__table'>
                <td className='post__data post__data--data'>{formatTime(board.date)}</td>
                <td className='post__data post__data--author'>{board.author}</td>
                <td className='post__data post__data--description'>{board.nameProblem}</td>
                <td className='post__data post__data--error'>{board.type}</td>
                <td className={`post__data post__data--status${rootClasses.join(' ')}`}>{board.status}</td>
            </tr>
        </table>
    )
}

export default BoardList
