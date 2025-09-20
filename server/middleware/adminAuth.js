import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({ success: false, message: 'Not Authorized login again' })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    
    if (decodedToken.id !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Not Authorized1 login again' })
    }
    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}
export default adminAuth