const mongoCollections = require('../config/mongoCollections');
const members = mongoCollections.members;
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const create = async (
  //memberId,
  name,
  email,
  phoneNumber,
  address
) => {
  if (
    !name||
    !email||
    !phoneNumber||
    !address
    ) throw "All Fields need to have valid values"

    if(name.trim().length === 0||
    email.trim().length === 0||
    phoneNumber.trim().length === 0 ||
    address.trim().length === 0
    ) throw "The Input Field can't be empty"
    
  // const isMemberIdInUse = async (memberId) => {
  //   console.log('in ismemberinuse')
  //   const membersCollection = await members();
  //   const member = await membersCollection.findOne({ memberId: memberId });
  //   return member !== null;
  // }
  
  //memberIdToCheck = helper.generateMemberID();
  //const isUsed = await isMemberIdInUse(memberIdToCheck);
  //if (isUsed) {
    //memberIdToCheck = helper.generateMemberID();
  //} else {
    //memberid = memberIdToCheck
  //}
  let memberIdToCheck = await helpers.generateMemberID();
  let newMember = {
    memberid: memberIdToCheck,
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    address: address
  };

  const membersCollection = await members();
  const insertInfo = await membersCollection.insertOne(newMember);
  // console.log('entered successfully')
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not add a new member";

  // const newId = insertInfo.insertedId.toString();
  // const member = await get(newId);
  // member._id = member._id.toString();
  return 'entered successfully';
}

const getAll = async () => {
  const membersCollection = await members();
  let memberList = await membersCollection.find({}).toArray();
  if (!memberList) throw 'Could not get all members';
  memberList = memberList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return memberList;
};

const get = async (id) => {
  id = helpers.checkId(id)
  const membersCollection = await members();
  const member = await membersCollection.findOne({ memberid: id });
  if (member === null) throw "No member with the given id";
  member._id = member._id.toString();
  return member;
};

const remove = async (id) => {
  id = helpers.checkId(id)
  const membersCollection = await members();
  const deletionInfo = await membersCollection.findOneAndDelete({
    memberid: id
  });

    if (deletionInfo.deletedCount == 0) {
      throw `Could not delete member with id of ${id}`;
    }
  return `member ${id} has been deleted.`;
};

exports.create = create;
exports.getAll = getAll;
exports.get = get;
exports.remove = remove;
