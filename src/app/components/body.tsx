import React from "react";

interface CuerpoProps{
    children: React.ReactNode
}

export default function Cuerpo({children}: CuerpoProps): React.ReactElement{
    return(
        <main>{children}</main>
    )

}