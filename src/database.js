const mongoose = require ('mongoose');
const uri = process.env.MONGOHOST
try {
    mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}); 
console.log('connect')
} catch (error) {
    console.error(error);
}