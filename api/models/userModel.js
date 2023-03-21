const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
            max: 1024,
            minLength: 6,
        },
        firstName : {
            type: String,
            require: true,
            minLength: 1,
            maxLenght: 100,
        },
        lastName : {
            type: String,
            require: true,
            minLength: 1,
            maxLenght: 100,
        },
        country : {
            type: String,
            require: true,
            minLength: 1,
            maxLenght: 100,
        }

    },
    {
        timestamps: true,
    }
);

// play function before save into DB
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

userSchema.statics.createUser = async function(body) {
        const user = await this.create(body);
        return user;
}


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;