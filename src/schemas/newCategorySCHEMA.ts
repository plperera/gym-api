import joi from "joi"

export type newCategoryBody = {
    type: string,
}

const newCategorySCHEMA = joi.object<newCategoryBody>({

    type: joi.string().required().min(2)

})

export {newCategorySCHEMA}