
import { useLocation } from 'react-router-dom';

const Thread = () => {
    let location = useLocation();

    const { item } = location.state;

    return(
        <h1>Threads of { item.title}</h1>
    )
}


export default Thread;