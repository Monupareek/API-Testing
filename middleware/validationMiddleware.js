const yup = require('yup');

const itemSchema = yup.object().shape({
    brand: yup.string().required(),
    series: yup.string().required(),
    category: yup.string().required(),
    itemCategory: yup.string(),
    family: yup.string().required(),
    model: yup.string().required(),
    modelSKU: yup.string(),
    application: yup.array().of(yup.string()),
    modelSKUDescription: yup.string(),
    cutsheetTitle: yup.string(),
    websiteModelAccordionTitle: yup.string(),
    antiGlare: yup.array().of(yup.string()),
    beamAngle: yup.array().of(yup.string()),
    bend: yup.array().of(yup.string()),
    connectionCable: yup.array().of(yup.string()),
    driver: yup.array().of(yup.string()),
    finish: yup.array().of(yup.string()),
    length: yup.array().of(yup.string()),
    lens: yup.array().of(yup.string()),
    lightColour: yup.array().of(yup.string()),
    operatingVoltage: yup.array().of(yup.string()),
    suspension: yup.array().of(yup.string()),
    trim: yup.array().of(yup.string()),
    watts: yup.array().of(yup.string()),
    dealerCost: yup.number(),
    dealerMSRP: yup.number(),
    repCost: yup.number(),
    distributorCost: yup.number(),
    contractorCost: yup.number(),
    endUserCost: yup.number(),
    isActive: yup.boolean(),
    isDeleted: yup.boolean()
});

const validateItem = async (req, res, next) => {

    try {
        const allKeys = Object.keys(itemSchema.fields); 
        const invalidKeys = Object.keys(req.body).filter(key => !allKeys.includes(key));

        if (invalidKeys.length > 0) {
            return res.status(400).json({ message: `Invalid keys provided` });
        }

        await itemSchema.validate(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({ message: "Validation failed" });

    }
};


module.exports = { validateItem };