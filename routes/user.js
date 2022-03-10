const { Router } = require('express');
const { 
    updateUser,
    deleteUser,
    getUser,
    getUsers, 
    getUserStats
} = require('../controllers/user');

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

const router = Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);
  
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
  
//GET USER
router.get("/find/:id", verifyTokenAndAdmin, getUser);
  
//GET ALL USER
router.get("/", verifyTokenAndAdmin, getUsers);

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;