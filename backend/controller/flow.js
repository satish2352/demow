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
        await Flow.findOneAndUpdate({userId}, {nodes, edges, data}, {upsert:true})
        return apiResponse.successResponseWithData(res, 'Flow Updated');
    }catch(e){
        console.log(e)
        return apiResponse.ErrorResponse(res, 'Error in Updating. Try again later')
    }
}

module.exports = {handleGetFlowByUserId, handleUpdateFlow}