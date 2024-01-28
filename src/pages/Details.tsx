import { useParams } from "react-router-dom";

// import React from "react";

const Details = () => {
    const {id} = useParams();
    return(
        <div className="footer">
            <h1>Details</h1>
            {id}
        </div>

    )
}

export default Details;