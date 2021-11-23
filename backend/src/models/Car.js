// importando os packages que precisamos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const CarSchema = new Schema({
    matricula:           {type:  String  , required: true , index: { unique: true   }, default: ""           },
    ano:                 {type:  Number  , required: true , index: { unique: false  }, default: 0            },
    marca:               {type:  String  , required: true , index: { unique: false  }, default: ""           },
    modelo:              {type:  String  , required: true , index: { unique: false  }, default: ""           },
    bloqueado:           {type:  Boolean , required: true , index: { unique: false  }, default: false        },
    observacao:          {type:  String  , required: false, index: { unique: false  }, default: ""           },
    insp_period_ult:     {type:  Date    , required: false, index: { unique: false  }, default: null         },
    insp_period_prx:     {type:  Date    , required: false, index: { unique: false  }, default: null         },
    insp_ww_ult:         {type:  Date    , required: false, index: { unique: false  }, default: null         },
    insp_ww_prx:         {type:  Date    , required: false, index: { unique: false  }, default: null         },
    insp_km_ult:         {type:  Number  , required: false, index: { unique: false  }, default: 0            },
    insp_km_prx:         {type:  Number  , required: false, index: { unique: false  }, default: 0            },
    renov_seguro_ult:    {type:  Date    , required: false, index: { unique: false  }, default: null         },
    renov_seguro_prx:    {type:  Date    , required: false, index: { unique: false  }, default: null         },
    renov_iuc_ult:       {type:  Date    , required: false, index: { unique: false  }, default: null         },
    renov_iuc_prx:       {type:  Date    , required: false, index: { unique: false  }, default: null         }
  }, { 
    timestamps: true
  }
);

module.exports = mongoose.model('Car',CarSchema);