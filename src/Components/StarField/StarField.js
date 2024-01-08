import ArenaStar from "./ArenaStar"
import React from "react"

const StarField = ({starCoords}) => {

    return (
        <>
            {starCoords.map((coord, index) => {
                return (
                    <ArenaStar coord={coord} key={index}/>
                )
            })}
        </>
    )
}

export default StarField