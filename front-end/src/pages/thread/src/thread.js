
import { useLocation } from 'react-router-dom';

const Thread = () => {
    let location = useLocation();

    const { item } = location.state;
    console.log(item)

    return(
        <h1>Threads of {item.caseTitle}</h1>
    )
}


export default Thread;