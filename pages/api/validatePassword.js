import { connectToDatabase } from "../../util/mongodb"
import { getAccount } from "../../util/utils"

export default async (req, res) => {
    let data = req.body
    data = JSON.parse(data)
    let acc = await getAccount(data.username)
    // console.log(acc)
    if (acc.length == 1) {
        acc = acc[0]
        if (acc.password == data.password) {
            // console.log('a ok')
            res.json({valid: true, message: 'good', account: acc})
        } else {
            res.json({valid: false, message: 'bad password'})
        }
    } else {
        res.json({valid: false, message: 'bad username'})
    }
}