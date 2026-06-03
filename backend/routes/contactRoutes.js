const express = require("express");

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("foto"),
  createContact
);

router.get("/", protect, getContacts);
router.post( "/", protect, upload.single("foto"), createContact);
router.put("/:id", protect, upload.single("foto"), updateContact);
router.delete("/:id", protect, deleteContact);

module.exports = router;