import joi from "joi"

export type deleteProductBody = {
    id: number,
    nome: string
}

const deleteProductSCHEMA = joi.object<deleteProductBody>({

    id: joi.number().required(),
    nome: joi.string().required().min(4)

})

export {deleteProductSCHEMA}