import { useMemo } from "react"

export const useSortedBoard = (board, sort) => {
    const sortedBoard = useMemo(() => {
        if (sort) {
            return [...board].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        {
            return board
        }
    }, [sort, board])
    return sortedBoard
}
export const usePosts = (board, sort, query) => {
    const sortedBoard = useSortedBoard(board, sort)
    const searchAndSorted = useMemo(() => {
        return sortedBoard.filter(post => post.title.toLowerCase().includes(query))
    }, [query, sortedBoard])
    return searchAndSorted
}
