import joi from "joi"

export type putProductBody = {
    id: number,
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

const putProductCategoriasSCHEMA = joi.object<categorias>({

    id: joi.number().required(),
    tipo: joi.string().required().min(4)

})

const putProductImagesBodySCHEMA = joi.object<imagesBody>({

    nome: joi.string().required()

})

const putProductSCHEMA = joi.object<putProductBody>({

    id: joi.number().required().min(1),
    nome: joi.string().required().min(4),
    rate: joi.number().required(),
    descricao: joi.string(),
    largura: joi.number(),
    altura: joi.number().required(),
    comprimento: joi.number(),
    peso: joi.number(),
    categorias: joi.array(),
    imagens: joi.array().items(putProductImagesBodySCHEMA).required(),

})

export {putProductSCHEMA}