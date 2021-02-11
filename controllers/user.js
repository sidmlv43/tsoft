const User = require("../models/user");
const Score = require("../models/score");
const score = require("../models/score");

exports.signup = (req, res) =>{
    const user = new User(req.body);
    user.save((err, user)=> {
        if(err){
          return res.status(400).json({
            err: "NOT able to save user in DB"
          })
        }
        res.json({
            name: user.firstName,
            email: user.email,
            id: user._id
          });
        })
};

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
      if(err || !user){
          return res.status(400).json({
              error: "No user found in DB"
          })
      }
      // console.log(user)
      req.profile = user;
      // console.log(req.profile)
      next();
  })
} 

exports.getUser = (req, res) =>{
  console.log(req.profile)
  return res.json(req.profile)
};


exports.putScore = (req, res) => {
  req.body.user = req.profile;
  const avgScore = (Number(req.body.firstRound) + Number(req.body.secondRound) + Number(req.body.thirdRound)) /3;
  const score = new Score({
    firstRound : req.body.firstRound,
    secondRound : req.body.secondRound,
    thirdRound : req.body.thirdRound,
    user: req.body.user._id,
    avgScore: avgScore
  })
  if(score.firstRound >10 || score.secondRound > 10 || score.thirdRound > 10){
    res.json({messge: "Score should not be greater than 10"})
  }else{
    score.save((err, score)=>{
      if(err){
        return res.status(400).json({
          err:"Unable to add Score in DB"
        })
      }
      res.json(score);
    })
  }

}

exports.getAllUserScore = (req, res) => {
  Score.find()
    .populate('user', 'firstName lastName email')
    .exec((err, scores)=>{
      if(err){
        res.status(400).json({
          err:"No scores To display"
        })
      }
      res.json(scores)
    })
}

exports.getHighestScorer = (req, res) => {
  Score.find()
    .populate('user', 'firstName lastName email')
    .exec((err, scores)=>{
      if(err){
        res.status(400).json({
          err:"No scores To display"
        })
      }
      // res.json(scores)
      let scoreArr = []
      // for (let score of scores){
      //   scoreArr.push(score.avgScore);
      // }

      const max = scores.reduce(function(prev, current) {
        return (prev.avgScore > current.avgScore) ? prev : current
    })
      res.json(max);
    })
}