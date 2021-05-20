import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const newScore = new ScoreCard(req.body);
    const existing = await ScoreCard.findOne({ name:newScore.name, subject:newScore.subject});
    if(existing) {
      await ScoreCard.updateOne(
        {name: newScore.name, subject: newScore.subject}, {score: newScore.score}
      );
      res.send({card:newScore, message:"Updating("+newScore.name+", "+newScore.subject+", "+newScore.score+")"});
    } 
    else{
      res.send({card:newScore, message:"Adding("+newScore.name+", "+newScore.subject+", "+newScore.score+")"});
      await newScore.save();
    }      
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/delete-card', async function (req, res){
  try {
    await ScoreCard.deleteMany({});
    res.send({message: 'Database cleared'});
  } catch (e) {
    res.json({message: 'Something went wrong...'});
  }
});

function cmp(a, b){
  if(a.score > b.score) return 1;
  return -1;
}
// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query-card', async function (req, res){
  try {
    const request = req.body;
    //console.log(request);
    let minscore = -1;
    if(request.type === 'name'){
      const mes = await ScoreCard.find({name: request.string, score: {$gt: minscore}});
      mes.sort(function cmp(a, b){
        if(a.score > b.score) return -1;
        return 1;
      });
      if(mes.length >= 1){
        const messages = ['Query Results(condition: name = '+request.string+')'];
        let total = 0;
        for(let i = 0; i < mes.length; i++){
          messages.push('name: '+mes[i].name+' || subject: '+ mes[i].subject+' || score: '+mes[i].score);
          total += mes[i].score;
        }
        messages.push('students: '+mes.length+' avarage: '+total/mes.length+' //sorted by score');
        messages.push('----------------------------------------------------------------');
        res.send({messages: messages});
      }
      else{
        res.send({message: request.type+' '+ request.string+' not found!'});
      }
    }
    else{
      const mes = await ScoreCard.find({subject: request.string, score: {$gt: minscore}});
      if(mes.length >= 1){
        const messages = ['Query Results(condition: subject = '+request.string+')'];
        let total = 0;
        for(let i = 0; i < mes.length; i++){
          messages.push('name: '+mes[i].name+' || subject: '+ mes[i].subject+' || score: '+mes[i].score);
          total += mes[i].score;
        }
        messages.push('students: '+mes.length+' avarage: '+total/mes.length+' //sorted by score');
        messages.push('----------------------------------------------------------------');
        res.send({messages: messages});
      }
      else{
        res.send({message: request.type+' '+ request.string+' not found!'});
      }
    }
  } catch (e) {
    res.json({message: 'Something went wrong...'});
  }
});

export default router;
