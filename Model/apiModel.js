const mongoose=require('mongoose');
const schema=mongoose.Schema;
const apiSchema=new schema({
    name:{
        type:String,
        required:[true,'name field is mandatory'],
        maxLength:[20,'name cannot be more than 20 characters'],
        minLength:[3,'name cannot be less than 3 characters']
    },
    email:{
        type:String,
        required:[true,'email field is mandatory'],
    },
    city:{
        type:String,
        required:[true,'city field is mandatory'],
        maxLength:[20,'city cannot be more than 20 characters'],
        minLength:[3,'city cannot be less than 3 characters']
    },
    image:{
        type:String,
        required:[true,'image field is mandatory']
    }
})

const apiModel=mongoose.model('apis',apiSchema);
module.exports=apiModel;