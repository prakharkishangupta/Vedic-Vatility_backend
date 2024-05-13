const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendSMS = async () =>{
    let msgOption = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: '+918429910191',
        body: 'I am prakhar',
    };
    try{
        const message = await client.messages.create(msgOption);
        console.log(message);
    }catch(err){
        console.log(err);
    }
}

router.get('/send', async (req, res) => {
    
    
    try {
        
        const result = await sendSMS();
        return res.json(result);
    } catch (error) {
        console.error("Error sending SMS:", error);
        return res.status(500).json({ success: false, error: "Failed to send SMS" });
    }
});

module.exports = router;