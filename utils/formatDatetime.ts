const formatDatetime = (date: Date | undefined) => {
    if (!date) {
        return 'DATA NON VALIDA'
    }
    return date.toString().split('T')[0]
}

export default formatDatetime