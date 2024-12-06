const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    pw: { type: String, required: true },
    cart: { type: [String], default: []}
});

const User = model('User', userSchema);

module.exports = { userSchema, User };