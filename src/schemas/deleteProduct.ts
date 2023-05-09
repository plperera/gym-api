import joi from "joi"

export type deleteProductBody = {
    id: number,
}
const deleteProductSCHEMA = joi.object<deleteProductBody>({

    id: joi.number().required().min(1),
})

export {deleteProductSCHEMA}