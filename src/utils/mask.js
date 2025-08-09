function maskCep(value){
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d)(\d)(\d)(\d)(\d)(\d)/g, "$1$2$3$4$5-$6")

    return value
}

export default maskCep