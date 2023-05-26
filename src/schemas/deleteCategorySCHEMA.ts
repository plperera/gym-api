import joi from "joi"

export type deleteCategoryBody = {
    id: number
}

const deleteCategorySCHEMA = joi.object<deleteCategoryBody>({

    id: joi.number().required()

})

export {deleteCategorySCHEMA}