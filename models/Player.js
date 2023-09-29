import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

const playerSchema = mongoose.Schema(
    {
        pseudo: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }

    },
    { timestamps: { createdAt: true }}
)

playerSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Player", playerSchema)