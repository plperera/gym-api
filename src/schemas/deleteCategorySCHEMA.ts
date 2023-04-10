import joi from "joi"

export type deleteCategoryBody = {
    type: string,
}

const deleteCategorySCHEMA = joi.object<deleteCategoryBody>({

    type: joi.string().required().min(2)

})

export {deleteCategorySCHEMA}