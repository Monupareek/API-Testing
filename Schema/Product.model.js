const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image',
    },
    mediaUrl: {
        type: String,
        default: '',
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    sortOrder: {
        type: Number,
        default: 0,
    },
});

const downloadItemSchema = new mongoose.Schema({
    fileName: {
        type: String,
        default: '',
    },
    isAvailable: {
        type: Boolean,
        default: false,
    },
});

const downloadsSchema = new mongoose.Schema({
    specificationDownload: downloadItemSchema,
    installationDownload: downloadItemSchema,
    iesDownload: downloadItemSchema,
    cadDownload: downloadItemSchema,
    lookbookDownload: downloadItemSchema,
    catalogueDownload: downloadItemSchema,
    videoDownload: downloadItemSchema,
});

const productModelsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    modelSKU: {
        type: String,
        default: '',
    },
    productModelImages: [mediaSchema],
    downloads: downloadsSchema,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    sortOrder: {
        type: Number,
        default: 0,
    },
});

const bannerItemSchema = new mongoose.Schema({
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image',
    },
    mediaUrl: {
        type: String,
        default: '',
    },
});

const BannerSectionSchema = new mongoose.Schema({
    banner: [bannerItemSchema],
    title: {
        type: String,
        default: '',
    },
    familyName: {
        label: { type: String, default: 'Product Family' },
        isVisible: { type: Boolean, default: true },
    },
    modelsAndSpecs: {
        label: { type: String, default: 'Models & Specs' },
        isVisible: { type: Boolean, default: true },
    },
    downloads: {
        label: { type: String, default: 'Downloads' },
        isVisible: { type: Boolean, default: true },
    },
    itemConfigurator: {
        label: { type: String, default: 'Item Configurator' },
        isVisible: { type: Boolean, default: true },
    },
});

const ProductDetailFamilySchema = new mongoose.Schema({
    family: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyFilter', default: null },
        name: { type: String, default: '' },
    },
    brand: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'BrandFilter', default: null },
        name: { type: String, default: '' },
    },
    series: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'SeriesFilter', default: null },
        name: { type: String, default: '' },
    },
    category: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
        name: { type: String, default: '' },
    },
    itemCategory: { type: String, default: '' },
    resourceImage: bannerItemSchema,
    productTileImage: bannerItemSchema,
    productHoverImage: bannerItemSchema,
    categoryTileImage: bannerItemSchema,
    categoryHoverImage: bannerItemSchema,
    collectionImage: bannerItemSchema,
    collectionHoverImage: bannerItemSchema,
    finishTileImage: bannerItemSchema,
    finishHoverImage: bannerItemSchema,
});

const ProductSchema = new mongoose.Schema(
    {
        bannerSection: BannerSectionSchema,
        productDetailFamilyRecordInternal: ProductDetailFamilySchema,
        BoardContainer: [mediaSchema],
        productModels: [productModelsSchema],
        downloads: downloadsSchema,
        similarProducts: [
            {
           url : {
                type: String,
                validate: {
                    validator: function(v) {
                        return /^(http|https):\/\/[^ "]+$/.test(v);
                    },
                    message: props => `${props.value} is not a valid URL`,
                },
            },
            sortOrder: {
                type: Number,
                default: 0,
            },
        }
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);
const Download = mongoose.model('Download', downloadItemSchema); 
const Product = mongoose.model('Product', productModelsSchema);
const BannerSection = mongoose.model('BannerItem', BannerSectionSchema);
const ProductDetail = mongoose.model('ProductDetail',ProductDetailFamilySchema);
const productSchema = mongoose.model('ProductSchema', ProductSchema);

module.exports = {Media , Download, Product, BannerSection, ProductDetail, productSchema};
