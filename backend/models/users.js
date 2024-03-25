import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
	name: { type: String, required: true, trim: true, lowercase: true },

	userName: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },

	password: { type: String, required: true, minLength: [8, "min length of password must be greater than 8"] },
	scores: [
		{
			topic: { type: String, required: true },
			marks: {
				max: { type: Number, required: true },
				obtain: { type: Number, required: true },
			},
			time: Date,
		},
	],
	privilege: { type: String, enum: ["admin", "non-admin"], default: "non-admin" },
});

userSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

const User = mongoose.model("user", userSchema);

export default User;
