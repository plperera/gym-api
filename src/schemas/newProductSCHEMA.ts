import joi from "joi"

export type newProductBody = {
    nome: string,
    rate: number,
    descricao: string,
    largura: number,
    altura: number,
    comprimento: number,
    peso: number,
    categorias: {
        id: number,
        tipo: string 
    }[]
}

const newProductSCHEMA = joi.object<newProductBody>({

    nome: joi.string().required().min(4),
    rate: joi.number().required(),
    descricao: joi.string(),
    largura: joi.number(),
    altura: joi.number().required(),
    comprimento: joi.number(),
    peso: joi.number(),
    categorias: joi.array().required()

})

export {newProductSCHEMA}