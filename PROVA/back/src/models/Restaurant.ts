import mongoose, { Schema } from "mongoose";

const RestaurantSchema = new Schema({
    nomecliente:{
        type: String,
        trim: true,
        required: [true, "É obrigatória"]
    },
    nummesa:{
        type: Number,
        required: [true, "O número é um campo obrigatório!"],
        unique: [true, "Está mesa ja foi reservada!"],
        min: [1, "O número da mesa deve ser no mínimo 1."],
        max: [30, "O número da mesa deve ser no máximo 30."],
    },
    date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['Reservado','Ocupado','Disponível'],
        default: 'Disponível'
    },
    contatoCliente: {
        type: String,
        required: true,
        match: [/^\+?(\d{1,3})?[\s-]?\(?(\d{2})\)?[\s-]?(\d{4})[\s-]?(\d{4})$/, 'Por favor insira um número de telefone válido.'],
      }

});

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema, "restaurants")

export default RestaurantModel