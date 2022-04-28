import { useEffect, useState } from "react"

export default function useNumberInput(inputData) {

    const [data, setData] = useState(inputData);

    const handleOnChange = e => {
        setData({...data, value: e.target.value})
    }

    const input = <>
        <label>{data.label}</label>
        <input type="number" 
               value={data.value}
               onChange={handleOnChange}/>
    </>

    return [input, Number(data.value)];
}