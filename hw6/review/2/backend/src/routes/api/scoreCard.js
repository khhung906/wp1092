import { Router } from "express";
import ScoreCard from "../../models/ScoreCard";

const router = Router();

router.post("/create-card", async function (req, res) {
  console.log("backend/src/routes/api/scoreCard.js router.post /create-card");
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    console.log(req.body);
    const existing = await ScoreCard.exists({
      name: req.body.name,
      subject: req.body.subject,
    });

    if (existing) {
      console.log("Update Card");
      const card = await ScoreCard.findOneAndUpdate(
        {
          name: req.body.name,
          subject: req.body.subject,
        },
        { score: req.body.score }
      );
      const msg = `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`;

      //console.log(card); {_id: , name: , subject: , score: , __v: 0}
      // __v: is a property set on each document when first created by Mongoose.
      res.status(200).send({ card, msg });
    } else {
      console.log("Add Card");
      const card = new ScoreCard(req.body);
      card.save();
      const msg = `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`;

      // console.log(card); { _id: , name: , subject: , score: }
      res.status(200).send({ card, msg });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong..." });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete("/delete-db", async function (req, res) {
  console.log("backend/routes/api/scoreCard router.delete /delete-db");
  try {
    await ScoreCard.deleteMany({});
    console.log("DB cleared");
    res.status(200).send({ msg: "Database cleared" });
  } catch (error) {
    console.log(error);
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.post("/query", async function (req, res) {
  console.log("backend/routes/api/scoreCard route.post /query");
  try {
    console.log(req.body);

    let cards;
    if (req.body.queryType === "name") {
      cards = await ScoreCard.find({ name: req.body.queryString });
    } else {
      cards = await ScoreCard.find({ subject: req.body.queryString });
    }
    console.log(cards);

    const cards_info = cards.map((element) =>
      JSON.stringify({
        name: element.name,
        subject: element.subject,
        score: element.score,
      })
    );
    console.log(cards_info);

    const message =
      cards_info.length === 0
        ? `${req.body.queryType} (${req.body.queryString}) not found!`
        : "Query Success";
    res.status(200).send({ cards_info, msg: message });
  } catch (error) {
    console.log(error);
  }
});

router.post("/logicalQuery", async function (req, res) {
  console.log("backend/routes/api/scoreCard route.post /logicalQuery");
  try {
    console.log(req.body);

    let cards;
    if (req.body.logicalQueryMode === "and") {
      cards = await ScoreCard.find({
        name: req.body.logicalQueryName,
        subject: req.body.logicalQuerySubject,
      });
    } else {
      cards = await ScoreCard.find({
        $or: [
          { name: req.body.logicalQueryName },
          { subject: req.body.logicalQuerySubject },
        ],
      });
    }
    const cards_info = cards.map((element) =>
      JSON.stringify({
        name: element.name,
        subject: element.subject,
        score: element.score,
      })
    );
    console.log(cards_info);

    const message =
      cards_info.length === 0
        ? `Logical Query: name == ${req.body.logicalQueryName} (${req.body.logicalQueryMode}) subject == ${req.body.logicalQuerySubject} not found!`
        : "Query Success";
    res.status(200).send({ cards_info, msg: message });
  } catch (error) {
    console.log(error);
  }
});
export default router;
