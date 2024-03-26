import TopicQuestion from "../models/topicQuestion.js";

export function addQuestions(req, res) {
	const questionBody = req.body;

	const entry = new TopicQuestion(questionBody);

	entry
		.save()
		.then((doc) => {
			return res.status(201).json({ Message: "Successful Addition", doc: doc });
		})
		.catch(async (err) => {
			if (err.code === 11000) {
				//same topic already present so append the new questions
				try {
					const updatedDoc = await TopicQuestion.findOneAndUpdate(
						{ topic: questionBody.topic },
						{
							$push: { questionBank: { $each: questionBody.questionBank ?? [] } },
						},
						{ new: true }
					);
					console.log(updatedDoc);
					return res.status(200).json({ Message: "New Questions Added Successfuly", updatedDoc: updatedDoc });
				} catch (err) {
					console.log(err);
					return res.status(500).json({ Message: "internal server error" });
				}
			}

			return res.status(400).json({ error: err, Message: "Bad Request" });
		});

	return;
}

export async function getQuestions(req, res) {
	const topicName = req.params.topic;

	try {
		const topicObj = await TopicQuestion.findOne({ topic: topicName });

		if (topicObj) return res.status(200).json({ Message: "Successfully Fetched", questions: topicObj });

		return res.status(404).json({ Message: "Topic Not Found" });
	} catch (err) {
		return res.status(400).json({ Message: "Bad Request", error: err });
	}
}

export async function getTopics(req, res) {
	try {
		let topics = await TopicQuestion.find({}, { topic: 1, _id: 0 }).sort({ topic: 1 });

		topics = topics.map((ele) => {
			return ele.topic;
		});

		if (topics.length > 0) return res.status(200).json({ Message: "Successfully Fetched", topics: topics });

		return res.status(404).json({ Message: "Not found any topic", topics: topics });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ Message: "Bad Request", error: err });
	}
}
