import React, { useEffect, useState } from 'react'
import { useFetching } from '../../../api/useFeetching'
import BoardServer from '../../../api/BoardServer'
import { useParams } from 'react-router-dom'
import Loader from "react-js-loader";
import cl from "../../Posts/Board.module.css"


const PostUpdate = () => {
    const params = useParams()
    const [postId, setPostId] = useState({})
    const [fetchPostId, postIdLoading, postIdError] = useFetching(async (id) => {
        const response = await BoardServer.getById(id)
        setPostId(response.data)
    })

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
                    <div style={{ marginTop: "20px" }}><p>{postId.description}</p></div>
                </div>

            }
        </div>
    )
}

export default PostUpdate
