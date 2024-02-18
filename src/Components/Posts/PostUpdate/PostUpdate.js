import React, { useEffect, useState } from 'react'
import "../PostUpdate/PostUpdate.css"
import { useFetching } from '../../../api/useFeetching'
import BoardServer from '../../../api/BoardServer'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "react-js-loader";
import cl from "../../Posts/Board.module.css"


const PostUpdate = ({ }) => {
    const router = useNavigate()
    const params = useParams()
    const [postId, setPostId] = useState({})
    const [fetchPostId, postIdLoading, postIdError] = useFetching(async (id) => {
        const response = await BoardServer.getById(id)
        setPostId(response.data)
    })
    const remove = async (id) => {
        const res = await fetch('https://65c73b49e7c384aada6e4d98.mockapi.io/api/v1/board/' + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        })

        const data = await res.json()
        if (data) {
            router(`/board/`)
        }
    }
    useEffect(() => {
        fetchPostId(params.id)
    }, [])

    const rootClasses = [cl.myBoard]
    if (postId.status === "Готово") {
        rootClasses.push(cl.green)
    }
    if (postId.status === "В работе") {
        rootClasses.push(cl.red)
    }
    if (postId.status === "В очереди") {
        rootClasses.push(cl.orange)
    }

    function formatTime(d) {
        d = new Date(postId.date)
        const date = d.getDate()
        const month = (d.getMonth() + 1).toString().padStart(2, "0")
        const yaer = d.getFullYear()

        return `${date}.${month}.${yaer}`
    }

    return (
        <div>
            {postIdError && <h1>Произошла ошибка {postIdError}</h1>}
            {postIdLoading
                ? <div style={{ marginTop: "30px" }}><Loader type="bubble-loop" bgColor="green" color="green" title={"Loading..."} size={100} /> </div>
                :
                <div>
                    <table className='post'>
                        <tr className='post__table'>
                            <td className='post__data post__data--data'>{formatTime(postId.date)}</td>
                            <td className='post__data post__data--author'>{postId.author}</td>
                            <td className='post__data post__data--description'>{postId.nameProblem}</td>
                            <td className='post__data post__data--error'>{postId.type}</td>
                            <td className={`post__data post__data--status${rootClasses.join(' ')}`}>{postId.status}</td>
                        </tr>
                    </table>
                    <div className='item-desc' style={{ marginTop: "20px" }}><p>{postId.description}</p>
                        <button onClick={() => remove(postId.id)} className='item-btn'>Удалить пост</button>
                    </div>

                </div>

            }
        </div>
    )
}

export default PostUpdate
