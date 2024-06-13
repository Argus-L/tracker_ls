"use client";

import {useState} from 'react'

export default function Toggle({children}: {children:any}) {
    const [showTable, setShowTable] = useState(false);
    const toggle = () => {
      setShowTable(!showTable);
    };
    
    let buttonText = showTable ? "Show Table" : "Show List" 

    return (
        <div className="flex flex-col items-center">
          <button className="px-3 py-1.5 mx-2 text-center bg-slate-100 rounded-md font-semibold text-slate-900" onClick={toggle}>{buttonText}</button>
          {showTable && children[1]}
          {!showTable && children[0]}
        </div>
    )
}