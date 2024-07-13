const express = require('express')
const {handleGetFlowByUserId, handleUpdateFlow } = require('../controller/flow')
const router= express.Router()

router.get('/:userId', handleGetFlowByUserId)
router.post('/update', handleUpdateFlow)

module.exports = router