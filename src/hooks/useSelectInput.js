import { useEffect, useState } from "react"

export default function useSelectInput(inputData) {

    const [data, setData] = useState(inputData);

    const handleOnChange = e => {
        setData({...data, value: e.target.value})
    }

    const input = <>
        <label>{data.label}</label>
        <select value={data.value}
                onChange={handleOnChange}>
            {data.options.map(option => {
                return <option key={option.value} value={option.value}>{option.text}</option>
            })}
        </select>
    </>

    return [input, data.value];
}