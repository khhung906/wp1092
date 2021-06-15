const Query = {   
    statsCount(parent, {severity, locationKeywords}, { db }, info) {
        try{
            console.log(db.people)
            let response = [];
            for(let j = 0; j < locationKeywords.length; j++){
                let cnt = 0;
                for(let i = 0; i < db.people.length; i++){
                    console.log(db.people[i].location.description)
                    if(db.people[i].location.description.includes(locationKeywords[j])){
                        if(severity){
                            if(db.people[i].severity >= severity) cnt++;
                        }
                        else cnt++;
                    }
                }
                response.push(cnt)
            }
            return response
        }catch (e) {
            return null
        }
    },
};

export default Query;