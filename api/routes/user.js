import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkauthentication", verifyToken, (req, res, next)=> {
//     res.send("hello user! you are authenticated")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next)=> {
//     res.send("hello user! you are authenticated and you can delete your acc")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=> {
//     res.send("hello admin! you are authenticated and you can delete your acc")
// })

// update
router.put("/:id", verifyUser,updateUser)

// delete
router.delete("/:id",verifyUser,deleteUser)

// get
router.get("/:id",verifyUser, getUser)


// get all
router.get("/", verifyAdmin,getUsers)

export default router 