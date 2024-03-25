import mongoose from "mongoose";

const topicQuestionSchema = mongoose.Schema({
	topic: { type: String, required: true, lowercase: true, trim: true, unique: true, index: 1 },
	questionBank: [
		{
			question: { type: String, trim: true, required: true },
			options: {
				a: { type: String, required: true },
				b: { type: String, required: true },
				c: { type: String, required: true },
				d: { type: String, required: true },
			},
			ans: { type: String, required: true, enum: ["a", "b", "c", "d"] },
		},
	],
});

const TopicQuestion = mongoose.model("topicQuestion", topicQuestionSchema);

export default TopicQuestion;
