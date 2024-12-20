const mongoose = require("mongoose");

const ItemConfigurationMasterSchema = new mongoose.Schema({
  brand: { type: String, default: "" },
  series: { type: String, default: "" },
  category: { type: String, default: "" },
  itemCategory: { type: String, default: "" }, // "ITEM_CATEGORY (FAMILY-MODEL)"
  family: { type: String, default: "" },
  model: { type: String, default: "" },
  modelSKU: { type: String, default: "" },
  application: { type: [String], default: [] },
  modelSKUDescription: { type: String, default: "" },
  cutsheetTitle: { type: String, default: "" },
  websiteModelAccordionTitle: { type: String, default: "" },
  antiGlare: { type: [String], default: [] }, // "Anti Glare (ag)"
  beamAngle: { type: [String], default: [] }, // "Beam Angle (ba)"
  bend: { type: [String], default: [] }, // "Bend (bnd)"   
  connectionCable: { type: [String], default: [] }, // "ConnectionCable (concab)"
  driver: { type: [String], default: [] }, // "Driver (drv)"  
  finish: { type: [String], default: [] }, // "Finish (fin)"
  length: { type: [String], default: [] }, // "Length (len)"
  lens: { type: [String], default: [] }, // "Lens (lens)"
  lightColour: { type: [String], default: [] }, // "Light Colour (lc)"
  operatingVoltage: { type: [String], default: [] }, // "Operating Voltage (ov)"
  suspension: { type: [String], default: [] }, // "Suspension (sus)"
  trim: { type: [String], default: [] }, // "Trim (trm)"
  watts: { type: [String], default: [] }, // "Watts (watts)"
  dealerCost: { type: Number, default: 0 }, // "Dealer Cost"
  dealerMSRP: { type: Number, default: 0 }, // "Dealer MSRP"
  repCost: { type: Number, default: 0 }, // "Rep Cost"
  distributorCost: { type: Number, default: 0 }, // "Distributor Cost"
  contractorCost: { type: Number, default: 0 }, // "Contractor Cost"
  endUserCost: { type: Number, default: 0 }, // "End User Cost"
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
      toJSON: {
        getters: true,
      },
      toObject: {
        getters: true,
      },
    },
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

module.exports = mongoose.model("ItemConfigurationMaster", ItemConfigurationMasterSchema);