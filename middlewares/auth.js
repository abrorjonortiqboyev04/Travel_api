const errorMessage = require('../utils/errorMessage')


exports.isAuth = (req,res,next)=>{
 try {
   
    if( !(req.headers.auth === process.env.HEADER_SECRET) ){
        return errorMessage(res,500,"Not client!!!!✖️✖️✖️✖️✖️✖️")
    }

    next()
 } 
 catch (error) {  errorMessage(res,500,error.message)  }
}