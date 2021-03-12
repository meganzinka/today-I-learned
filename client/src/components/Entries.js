import React from 'react'
import { useState, useEffect} from "react"

const Entries = () => {
    const [loadEntries, setLoadEntries] = useState(true)
    const [entryArray, setEntryArray] = useState([])
    
    useEffect (() => {
    if (loadEntries) {
        fetch ('/showall')
        .then((res) => res.json())
        .then((list) => {
            setEntryArray(list)
        })
    setLoadEntries(false)
    }
    })
    return (
        <div>
        <h1>This is the Entries Page</h1>
        <h3>{entryArray}</h3>
        </div>
    )
}

export default Entries
