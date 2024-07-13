const Flow = require('../model/flows')
const apiResponse = require('../helper/apiResponse')

async function handleGetFlowByUserId(req, res){
    try{
        const flow = await Flow.findOne({userId:req.params.userId})
        return apiResponse.successResponseWithData(res, 'Flow found', { flow });
    }catch(e){
        console.log(e)
        return apiResponse.ErrorResponse(res, "Flow not Found")
    }
}

async function handleUpdateFlow(req, res){
    try{
        const {nodes, edges, data, userId} = req.body
        const flow = Flow.findOneAndUpdate({userId}, {nodes, edges, data}, {upsert:true, returnOriginal:false})
        return apiResponse.successResponseWithData(res, 'Flow Created', { id:flow._id });
    }catch(e){
        console.log(e)
        return apiResponse.ErrorResponse(res, 'Error in creating. Try again later')
    }
}

module.exports = {handleGetFlowByUserId, handleUpdateFlow}