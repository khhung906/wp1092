import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const {name,subject,score} = await req.body;
    const data = new ScoreCard({name,subject,score});
    let searchQ;
    ScoreCard.find({'name':name, 'subject': subject}, function(err,docs){
      if (err){console.log(err);}
      else {
        if (docs.length ===0){
          data.save();
          res.send({card: "aaaa",message:`Adding ${name} ${subject} ${score}`})
        }
        else {
          docs[0]["score"]=score;
          docs[0].save();
          res.send({card: "aaaa",message:`Updating ${name} ${subject} ${score}`})
        }
      }})
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.get('/delete', async function (req, res){
  try{
    await ScoreCard.deleteMany({},()=>{
      console.log("delete");
    })
    res.send({ message: 'Database cleared'});
  } catch(e){
    res.json({ message: 'Something went wrong...' });
  }
}

);

// TODO: implement the DB query
// route.xx(xxxx)
router.post('/search-card', async function(req,res){
  try{
    const {queryType, queryString} = await req.body;
    console.log(queryType, queryString);
  }catch(e){
    res.json({ message: 'Something went wrong...' });
  }
})
export default router;
