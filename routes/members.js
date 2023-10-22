var express = require("express");
var router = express.Router();
const data= require('../data/index')
const memberData = data.members
// var memberData = require('../data/index.js').memberData;
var ObjectId = require('mongodb').ObjectId;
var helper = require("../helpers.js");

router
  .route('/')
  .get(async (req, res) => {
	try{
		let membersList = await memberData.getAll();
		res.json(membersList);
	  } catch (e) {
		res.sendStatus(500);
	  }
	})
  .post(async (req, res) => {
  	const memberInfo = req.body;
	if (!memberInfo.name) {
		res.status(400).json({ error: 'name must be provided' });
		return;
	}
	if (!memberInfo.email) {
		res.status(400).json({ error: 'email must be provided' });
		return;
	}
	if (!memberInfo.phoneNumber) {
		res.status(400).json({ error: 'phonenumber must be provided' });
		return;
	}
	if (!memberInfo.address) {
		res.status(400).json({ error: 'address must be provided' });
		return;
	}
  	if (
    	typeof memberInfo.name !== 'string' ||
    	typeof memberInfo.email !== 'string' || 
    	typeof memberInfo.address !== 'string' || 
    	memberInfo.name.trim() === '' || 
    	memberInfo.email.trim() === ''|| 
    	memberInfo.address.trim() === '' )
	  	{
		  res.status(400).json({
			  error: 'Input must be a valid string'
		  });
	    return;
	  	}
  	try{
    	const { name, email, phoneNumber,address } = memberInfo;
    	const new_member_Post = await memberData.create(
       		name,
       		email,
       		phoneNumber,
       		address,
    	);
    	res.json(new_member_Post);
   	}catch(e){
    	res.status(500).send(e);
   	}
});



router
  .route('/:id')
  .get(async (req, res) => {
	const id = req.params.id
	try{
		const member = await memberData.get(req.params.id);
		res.status(200).json(member);
	}catch(e){
		res.status(404).json({ error: e });
	}
  })



  .delete(async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({ error: 'ID should be provided in order to delete' });
      return;
    }
    try {
      await memberData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'member not found' });
      return;
    }
    try {
      await memberData.remove(req.params.id);
      res.status(200).json({ memberId: req.params.id, deleted: true });
    } catch (e) {
      res.status(500).json({ e });
    }
  })

module.exports = router;
