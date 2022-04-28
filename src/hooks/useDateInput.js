import { useEffect, useState } from "react"

export default function useDateInput(inputData) {

    const [data, setData] = useState(inputData);

    const handleOnChange = e => {
        setData({...data, value: e.target.value})
    }

    const input = <>
        <label>{data.label}</label>
        <input type="date" 
               value={data.value}
               onChange={handleOnChange}/>
    </>

    return [input, data.value];
}