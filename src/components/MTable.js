import React, { useEffect, useState } from 'react'

function MTable() {
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        fetch(
            `https://intense-tor-76305.herokuapp.com/merchants`,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(response => {
                setCustomerData(response)
            })
            .catch(error => console.error(error))
    }, []);

    return (
        <div/>
    )
}

export default MTable
