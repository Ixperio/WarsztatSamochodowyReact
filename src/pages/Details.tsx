import { useParams } from "react-router-dom";

// import React from "react";

const Details = () => {
    const {id} = useParams();
    return(
        <>
            <h1>Details</h1><br />
            {id}
        </>

    )
}

export default Details;