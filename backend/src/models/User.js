// importando os packages que precisamos
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// schema
const UserSchema = new Schema({
    nome:          {type:  String , required: true                            , default:  ""   },
    apelido:       {type:  String , required: true                            , default:  ""   },
    telemovel:     {type:  String , required: true , index: { unique: true   }, default:  ""   },
    utilizador:    {type:  String , required: true , index: { unique: true   }, default:  ""   },
    password:      {type:  String , required: true , index: { unique: false  }, select: false  },
    veiculo:       {type: [String], required: false, index: { unique: false  }, default: [""]  },
    email:         {type:  String , required: false, index: { unique: false  }, default:  ""   },
    administrador: {type: Boolean , required: true , index: { unique: false  }, default: false },
    bloqueado:     {type: Boolean , required: true , index: { unique: false  }, default: false }
  }, { 
    timestamps: true
  }
);

// gerar o hash do password antes de salvar
UserSchema.pre('save', function (next) {
    const user = this
  
    // gerar o hash apenas se o password mudou o para um novo usuário
    if (!user.isModified('password')) { return next() }
  
    // gerando o hash
    const hash = bcrypt.hashSync(user.password)
  
    // trocando o password pelo hash
    user.password = hash
    next()
  })


  // method to compare a given password with the database hash
UserSchema.methods.comparePassword = function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('User',UserSchema);
