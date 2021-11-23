// importando os packages que precisamos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const TripSchema = new Schema({
    user_id:             {type:  String  , required: true , index: { unique: false  }, default: ""           },
    user_utilizador:     {type:  String  , required: true , index: { unique: false  }, default: ""           },

    car_id:              {type:  String  , required: true , index: { unique: false  }, default: ""           },
    car_matricula:       {type:  String  , required: true , index: { unique: false  }, default: ""           },

    local_origem:        {type:  String  , required: true , index: { unique: false  }, default: ""           },
    local_destino:       {type:  String  , required: true , index: { unique: false  }, default: ""           },

    viagem_data:         {type:  Date    , required: true , index: { unique: false  }, default: "01/01/1900" },
    viagem_periodo:      {type:  String  , required: true , index: { unique: false  }, default: ""           },
    viagem_duracao:      {type:  String  , required: true , index: { unique: false  }, default: "01:00"      },
    viagem_dist_km:      {type:  Number  , required: true , index: { unique: false  }, default: 0            },
    viagem_idavolta:     {type:  Boolean , required: true , index: { unique: false  }, default: false        },

    vlr_viag_bruto:      {type:  Number  , required: true , index: { unique: false  }, default: 0            },
    vlr_viag_liquid:     {type:  Number  , required: true , index: { unique: false  }, default: 0            },
    comissao_ww_per:     {type:  Number  , required: true , index: { unique: false  }, default: 0            },
    comissao_ww_vlr:     {type:  Number  , required: true , index: { unique: false  }, default: 0            },

    comissao_ww_ok:      {type:  Boolean , required: true , index: { unique: false  }, default: false        }
  }, { 
    timestamps: true
  }
);

module.exports = mongoose.model('Trip',TripSchema);