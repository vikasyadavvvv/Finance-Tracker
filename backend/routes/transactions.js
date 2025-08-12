import { Router } from "express";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../controllers/transactionController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware);
router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
