import { connectToDatabase } from "../../util/mongodb"
import { doesAccountExist, createAccount} from '../../util/utils'

export default async function handler (req, res) {
    // res.status(200).json({ name: 'Next.js' })
    let data = req.body
    data = JSON.parse(data)
    
    const isValid = !(await doesAccountExist(data.username))
    if(isValid) {
        await createAccount(data.username,data.password)
        res.status(200).json({success: true});
    }else {
        res.status(200).json({success: false})
    }
    
}
