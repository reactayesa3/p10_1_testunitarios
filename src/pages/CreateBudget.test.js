import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateBudget from "./CreateBudget"


describe(('Formulario Crear Cliente'), () => {  // Suite case


    test('Valida el campo CIF', async () => { // Case test
        render(<CreateBudget />) // A render se le pasa el componente con la misma implementación que en React (por ejemplo si llevará props habría que introducirlas)
        // Si necesitamos ver el componente renderizado podemos pasarlo a una constante
        // y usar debug para comprobarlo
        // const component = render(<CreateBudget />);
        // component.debug();
        const validationMessage = await screen.findByTestId('test-cif-label'); // Obtención de 
        const cifInput = await screen.findByTestId('test-cif-input'); // Elementos renderizados

        userEvent.type(cifInput, 'Z'); // Acciones del test
        expect(validationMessage).toHaveTextContent('El CIF debe comenzar por letra válida y tener 9 caracteres'); // Aserción
    })
    test('Botón disabled cuando el form no esté válido', async () => {
        render(<CreateBudget />)
        const formButton = await screen.findByTestId('form-button');
        expect(formButton).toBeDisabled();
    })

})