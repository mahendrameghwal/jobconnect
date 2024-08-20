const isJobIdUnique = require("./IsJobIdUnique");


const GenrateJobId = async () => {
    const idLength = 10;
    let id = '';
    // Characters to use fo generating the ID
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
  
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
       id += characters.charAt(randomIndex);
    }
  
    //the generated ID is unique
    const isUnique = await isJobIdUnique(id);
  
    // If the ID is not Unique recall this function to Genrate New Unique ID
    if (!isUnique) {
      return GenrateJobId();
    }
  
    return id;
  };
  
  module.exports= GenrateJobId