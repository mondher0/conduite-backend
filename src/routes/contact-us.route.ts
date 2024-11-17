import { Router } from "express";
import {
  contactUs,
  getAllContactUs,
  getContactUsById,
} from "../controllers/contact-us.controller";

const router: Router = Router();

router.route("/create").post(contactUs);
router.route("/get").get(getAllContactUs);
router.route("/get/:id").get(getContactUsById);

export default router;
