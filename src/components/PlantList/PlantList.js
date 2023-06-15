import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store);

    useEffect(() => {
        dispatch({type: "GET_PLANTS"});
    }, []);

    return (
        <div>
            <h3>This is the plant list</h3>
            <ul> 
                {reduxState.plantList.map((plant) => (
                    <li key={plant.id}>
                    {plant.name} 
                    <button onClick={()=>dispatch({type:"DELETE", payload:plant.id})}>
                    DELETE
                    </button>
                    </li>                   
                ))}
                



            </ul>
        </div>
    );
}

export default PlantList;
