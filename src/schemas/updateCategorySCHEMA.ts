import joi from "joi"

export type updateCategoryBody = {
    type: string,
    id: number
}

const updateCategorySCHEMA = joi.object<updateCategoryBody>({

    type: joi.string().required().min(2),
    id: joi.number().required()

})

export {updateCategorySCHEMA}