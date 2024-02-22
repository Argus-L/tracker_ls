"use client";

import {useState} from 'react'

export default function Toggle({children}: {children:any}) {
    const [showTable, setShowTable] = useState(false);
    const toggle = () => {
      setShowTable(!showTable);
    };
    
    let buttonText = showTable ? "Show List" : "Show Table"

    return (
        <div className="flex flex-col items-center">
          <button className="px-3 py-1.5 mx-2 text-center bg-slate-100 rounded-md font-semibold text-slate-900" onClick={toggle}>{buttonText}</button>
          {showTable && children[0]}
          {!showTable && children[1]}
        </div>
    )
}