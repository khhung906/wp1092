const Mutation = {
  insertPeople(parent, {data}, { db, pubsub }, info)  {
    console.log(data)
    try {
      for(let i = 0; i < data.length; i++){
        let people = db.people
        let result = people.filter(person => person.ssn == data[i].ssn);
        console.log(result)
        if(result.length >= 1){
          let p;
          for(let j = 0; j < people.length; j++){
            if(people[j].ssn === data[i].ssn) p = j;
          }
          people[p] = data[i];
        }
        else{
          people.push(data[i])
        }
      }
      return true
    } catch (e) {
      return false
    }
  },

};

export { Mutation as default };
