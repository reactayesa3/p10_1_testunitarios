const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency
    }).format(amount);
}

export default formatCurrency;