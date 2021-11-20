const mongoose = require ('mongoose');
 
try {
    mongoose.connect('mongodb://localhost/notes-db', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}); 
console.log('connect')
} catch (error) {
    console.error(error);
}