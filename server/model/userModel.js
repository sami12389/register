import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true,
        max : 50
    },
}, {
    timestamps: true
})


userSchema.pre("save", async function(){
    const salt = await bcryptjs.genSalt(10)
    const hashedPwd = await bcryptjs.hash(this.pwd, salt)
    this.pwd = hashedPwd
})


export default mongoose.model("User", userSchema)