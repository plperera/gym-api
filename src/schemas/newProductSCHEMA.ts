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
    imagens: {
        nome: string 
    }[]
}
type categorias = {
    id: number,
    tipo: string
}
type imagesBody = {
    nome: string
}

const newProductCategoriasSCHEMA = joi.object<categorias>({

    id: joi.number().required(),
    tipo: joi.string().required().min(4)

})

const newProductImagesBodySCHEMA = joi.object<imagesBody>({

    nome: joi.string().required()

})

const newProductSCHEMA = joi.object<newProductBody>({

    nome: joi.string().required().min(4),
    rate: joi.number().required(),
    descricao: joi.string(),
    largura: joi.number(),
    altura: joi.number().required(),
    comprimento: joi.number(),
    peso: joi.number(),
    categorias: joi.array().items(newProductCategoriasSCHEMA).required(),
    imagens: joi.array().items(newProductImagesBodySCHEMA).required(),

})

export {newProductSCHEMA}