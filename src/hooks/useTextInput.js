import { useEffect, useState } from "react"

export default function useTextInput(inputData) {

    const [data, setData] = useState(inputData);
    const [validation, setValidation] = useState({
        valid: data.valid,
        errorMessage: data.errorMessages[0]
    })

    const handleOnChange = e => {
        setData({...data, value: e.target.value})
    }

    useEffect(() => {
        if (data.value.length === 0 && !data.valid) {
            setValidation({
                valid: false,
                errorMessage: data.errorMessages[0]
            });
        } else if (!new RegExp(data.pattern).test(data.value)) {
            setValidation({
                valid: false,
                errorMessage: data.errorMessages[1]
            })
        } else {
            setValidation({
                valid: true,
                errorMessage: ''
            })
        }
    }, [data])

    const input = <>
        <label>
            {data.label}
            <span className="alert" data-testid={data.labelTestId}>{validation.errorMessage}</span>
        </label>
        <input type="text" 
               value={data.value}
               maxLength={data.maxLength}
               onChange={handleOnChange}
               data-testid={data.inputTestId}/>
    </>

    return [input, data.value, validation.valid];
}