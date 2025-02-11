const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_149071&psig=AOvVaw2ctnMmiuML9ldXeIKDBfYK&ust=1735758743863000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMDx2MLb0ooDFQAAAAAdAAAAABAE',
    validate: {
      validator: function(v) {
        return new RegExp(
          "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
          "i"
        ).test(v);
      },
      message: props => `${props.value} não é uma URL válida!`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} não é um email válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

module.exports = mongoose.model('user', userSchema);