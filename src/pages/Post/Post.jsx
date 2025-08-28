import { useParams } from 'react-router-dom'
import style from './Post.module.css'





const Post = () => {
    const { id } = useParams()

    return (
        <div>
            <h1>Post {id}</h1>
        </div>
    )
}

export default Post