import Post from "../Components/Posts/Post";
import PostUpdate from "../Components/Posts/PostUpdate/PostUpdate";
import { Navigate } from "react-router"



export const PublicRoutes = [
    { path: '/board/', element: <Post />, exact: true },
    { path: '/board/:id', element: <PostUpdate />, exact: true },
    { path: '*', element: <Navigate to="/board/" replace />, exact: true },
]

