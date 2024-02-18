import React, { useEffect, useMemo, useState } from 'react'
import "../Posts/Post.css"
import BoardList from './BoardList'
import { useFetching } from '../../api/useFeetching'
import BoardServer from '../../api/BoardServer'
import Loader from "react-js-loader";
import Nav from '../Nav/Nav'
import { useNavigate } from 'react-router-dom'

const Post = ({ }) => {
    const [board, setBoard] = useState([])
    const [filterName, setFilterName] = useState("")
    const [selectedSort, setSelectedSort] = useState("")
    const [typeSort, setTypeSort] = useState("")
    const [boardFetch, boardLoading, boardError] = useFetching(async () => {
        const response = await BoardServer.getAll()
        setBoard(response.data)
    })
    const categories = Array.from(
        new Set(board.map((board) => board.status))
    )
    const statusOptions = categories.map((status) => ({
        value: status,
        label: status
    }))
    const filterStatus = selectedSort ? board.filter((board) => board.status === selectedSort.value) : board && typeSort ? board.filter((board) => board.type === typeSort.value) : board

    const boardType = Array.from(
        new Set(board.map((board) => board.type))
    )
    const typeOption = boardType.map((type) => ({
        value: type,
        label: type
    }))

    useEffect(() => {
        boardFetch()
    }, [])

    return (
        <>
            <Nav filterName={filterName} setFilterName={setFilterName} board={board} value={[selectedSort, typeSort]} options={[statusOptions, typeOption]} onChange={[(statusOptions) => setSelectedSort(statusOptions), (typeOption) => setTypeSort(typeOption)]} />
            {boardError && <h1 style={{ textAlign: "center", marginTop: "20px" }}>Произошла ошибка: {boardError}</h1>}
            {boardLoading ? <div style={{ marginTop: "30px" }}><Loader type="bubble-loop" bgColor="green" color="green" title={"Loading..."} size={100} /> </div> :
                <div>
                    {filterStatus.filter((board) => { return filterName.toLowerCase() === "" ? board : board.nameProblem.toLowerCase().includes(filterName) }).map((board) => <BoardList key={board.id} board={board} />)}
                </div >}

        </>
    )
}

export default Post
