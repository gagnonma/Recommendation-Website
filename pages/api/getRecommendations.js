import {getRecommendations} from '../../util/getRecommendations'

export default async (req, res) => {
    let data = req.body
    data = JSON.parse(data)
    const rex = await getRecommendations(data)
    res.json({recs: rex})
}