const express = require("express")

const app = express();
const Port = 3500;

require("./Connection/connection");

/* const { Media, Download, Product, BannerSection, ProductDetail, productSchema } = require("./Schema/Product.model") */

const itemModel = require("./Schema/ItemConfigurationMaster.model")

const bodyParser = require("body-parser")
app.use(bodyParser.json());

const  { validateItem }  = require('./middleware/validationMiddleware');


app.post('/addItem', validateItem , async (req, res) => {
    try {
        const postData = {
            brand: req.body.brand || "",
            series: req.body.series || "",
            category: req.body.category || "",
            itemCategory: req.body.itemCategory || "",
            family: req.body.family || "",
            model: req.body.model || "",
            modelSKU: req.body.modelSKU || "",
            application: req.body.application || [],
            modelSKUDescription: req.body.modelSKUDescription || "",
            cutsheetTitle: req.body.cutsheetTitle || "",
            websiteModelAccordionTitle: req.body.websiteModelAccordionTitle || "",
            antiGlare: req.body.antiGlare || [],
            beamAngle: req.body.beamAngle || [],
            bend: req.body.bend || [],
            connectionCable: req.body.connectionCable || [],
            driver: req.body.driver || [],
            finish: req.body.finish || [],
            length: req.body.length || [],
            lens: req.body.lens || [],
            lightColour: req.body.lightColour || [],
            operatingVoltage: req.body.operatingVoltage || [],
            suspension: req.body.suspension || [],
            trim: req.body.trim || [],
            watts: req.body.watts || [],
            dealerCost: req.body.dealerCost || 0,
            dealerMSRP: req.body.dealerMSRP || 0,
            repCost: req.body.repCost || 0,
            distributorCost: req.body.distributorCost || 0,
            contractorCost: req.body.contractorCost || 0,
            endUserCost: req.body.endUserCost || 0,
            isActive: req.body.isActive || true,
            isDeleted: req.body.isDeleted || false
        }

        const data = await itemModel.create(postData);
        res.status(201).send(data);

    } catch (error) {
        res.status(400).send("error");
    }
})

app.get('/getItem', async (req, res) => {
    try {
        let { brand, series, category, family, model, page, size } = req.query;
        const query = {};
        if (brand) query.brand = brand;
        if (series) query.series = series;
        if (category) query.category = category;
        if (family) query.family = family;
        if (model) query.model = model;

        
        if(!page){
            page = 1;
        }
        if(!size){
            size = 1;
        }

        const skip = (page-1) * size;
        const limit = parseInt(size);

        const data = await itemModel.find(query).limit(limit).skip(skip);

        const count = await itemModel.countDocuments(); 

        res.status(200).json({ 
            totalCount: count,
            page : page,
            limit : limit,  
            data 
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send("error");
    }
})

app.get('/getOneItem/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await itemModel.findById(id);

        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.delete('/deleteItem/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await itemModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(222).json({ message: "deleted!" });

    } catch (err) {
        console.log(err);
    }
})

app.delete('/deleteByKeyItem', async (req, res) => {
    try {
        const { brand, series, category, family, model } = req.query;
        const query = {};
        if (brand) query.brand = brand;
        if (series) query.series = series;
        if (category) query.category = category;
        if (family) query.family = family;
        if (model) query.model = model;

        if (Object.keys(query).length === 0) {
           return res.status(201).json({ message: 'Sent the query it shold not be Empty' });
        }
        else {
            const data = await itemModel.deleteMany(query);
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: `No items found with the given keys: ${JSON.stringify(query)}` });
            }
            return res.status(200).json({ message: `${data.deletedCount} items deleted successfully!` });
        }



    } catch (err) {
        console.log(err);
    }
})

app.patch('/editItem/:id',validateItem , async (req, res) => {
    const { id } = req.params;
    const newdata = {
        brand: req.body.brand || "",
        series: req.body.series || "",
        category: req.body.category || "",
        itemCategory: req.body.itemCategory || "",
        family: req.body.family || "",
        model: req.body.model || "",
        modelSKU: req.body.modelSKU || "",
        application: req.body.application || [],
        modelSKUDescription: req.body.modelSKUDescription || "",
        cutsheetTitle: req.body.cutsheetTitle || "",
        websiteModelAccordionTitle: req.body.websiteModelAccordionTitle || "",
        antiGlare: req.body.antiGlare || [],
        beamAngle: req.body.beamAngle || [],
        bend: req.body.bend || [],
        connectionCable: req.body.connectionCable || [],
        driver: req.body.driver || [],
        finish: req.body.finish || [],
        length: req.body.length || [],
        lens: req.body.lens || [],
        lightColour: req.body.lightColour || [],
        operatingVoltage: req.body.operatingVoltage || [],
        suspension: req.body.suspension || [],
        trim: req.body.trim || [],
        watts: req.body.watts || [],
        dealerCost: req.body.dealerCost || 0,
        dealerMSRP: req.body.dealerMSRP || 0,
        repCost: req.body.repCost || 0,
        distributorCost: req.body.distributorCost || 0,
        contractorCost: req.body.contractorCost || 0,
        endUserCost: req.body.endUserCost || 0,
        isActive: req.body.isActive || true,
        isDeleted: req.body.isDeleted || false
    };

    try {
        const data = await itemModel.findByIdAndUpdate(id, newdata, { new: true });
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.send(data);
    } catch (error) {
        console.log(error);
    }

});


/* app.post('/addProductMediaSchema', async (req, res) => {
    try {
        const data = await Media.create(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/getProductMediaSchema', async (req, res) => {
    try {
        const data = await Media.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.get('/getOneProductMediaSchema/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Media.findById(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.delete('/deleteProductMediaSchema/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Media.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(222).json({ message: "deleted!" });

    } catch (err) {
        console.log(err);
    }
})

app.put('/editProductMediaSchema/:id', async (req, res) => {
    const { id } = req.params;
    const newdata = req.body;
    try {
        const data = await Media.findByIdAndUpdate(id, newdata, { new: true });
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.send(data);
    } catch (error) {
        console.log(error);
    }

});


app.post('/addProductDownloadSchema', async (req, res) => {
    try {
        const data = await Download.create(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/getProductDownloadSchema', async (req, res) => {
    try {
        const data = await Download.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.get('/getOneProductDownloadSchema/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Download.findById(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.delete('/deleteProductDownloadSchema/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Download.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(222).json({ message: "deleted!" });

    } catch (err) {
        console.log(err);
    }
})

app.put('/editProductDownloadSchema/:id', async (req, res) => {
    const { id } = req.params;
    const newdata = req.body;
    try {
        const data = await Download.findByIdAndUpdate(id, newdata, { new: true });
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.send(data);
    } catch (error) {
        console.log(error);
    }

});


app.post('/addProductModelSchema', async (req, res) => {
    try {
        const data = await Product.create(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/getProductModelSchema', async (req, res) => {
    try {
        const data = await Product.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.get('/getOneProductModelSchema/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.findById(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.delete('/deleteProductModelSchema/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Product.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(222).json({ message: "deleted!" });

    } catch (err) {
        console.log(err);
    }
})

app.put('/editProductModelSchema/:id', async (req, res) => {
    const { id } = req.params;
    const newdata = req.body;
    try {
        const data = await Product.findByIdAndUpdate(id, newdata, { new: true });
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.send(data);
    } catch (error) {
        console.log(error);
    }

});

app.post('/addBannerSectionSchema', async (req, res) => {
    try {
        const data = await BannerSection.create(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/getBannerSectionSchema', async (req, res) => {
    try {
        const data = await BannerSection.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send("error");
    }
})

app.delete('/deleteBannerSectionSchema/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await BannerSection.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(222).json({ message: "deleted!" });

    } catch (err) {
        console.log(err);
    }
})

app.put('/editBannerSectionSchema/:id', async (req, res) => {
    const { id } = req.params;
    const newdata = req.body;
    try {
        const data = await BannerSection.findByIdAndUpdate(id, newdata, { new: true });
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.send(data);
    } catch (error) {
        console.log(error);
    }

});

app.post('/addProductDetailSchema', async (req, res) => {
    try {
        const data = await ProductDetail.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get('/getProductDetailSchema', async (req, res) => {
    try {
        const data = await ProductDetail.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.delete('/deleteProductDetailSchema/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await ProductDetail.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(222).json({ message: "deleted!" });

    } catch (err) {
        console.log(err);
    }
})

app.put('/editProductDetailSchema/:id', async (req, res) => {
    const { id } = req.params;
    const newdata = req.body;
    try {
        const data = await ProductDetail.findByIdAndUpdate(id, newdata, { new: true });
        if (!data) {
            return res.status(222).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.send(data);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


app.post('/addProductSchema', async (req, res) => {
    try {
        const data = await productSchema.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get('/getProductSchema', async (req, res) => {
    try {
        const data = await productSchema.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.delete('/deleteProductSchema/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await productSchema.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.status(222).json({ message: "deleted!" });
    } catch (err) {
        console.log(err);
    }
})

app.put('/editProductSchema/:id', async (req, res) => {
    const { id } = req.params;
    const newdata = req.body;
    try {
        const data = await productSchema.findByIdAndUpdate(id, newdata, { new: true });
        if (!data) {
            return res.status(222).json({ message: `Cannot find any data with ID ${id}` })
        }
        res.send(data);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}) */

app.listen(Port, () => {
    console.log(`Server Running on ${Port}`);
})