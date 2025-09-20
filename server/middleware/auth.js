import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.json({ success : false, message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        console.log(error);
        return res.json({success : false , message : error.message})
    }

}

export default authUser;