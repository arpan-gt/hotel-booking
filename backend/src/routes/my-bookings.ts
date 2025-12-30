import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    console.log("Fetching bookings for UserID:", userId);

    // Validate that casting is possible
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error("Invalid User ID format for casting:", userId);
        return res.status(400).json({ message: "Invalid User ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: objectId } },
    });

    console.log("Hotels found:", hotels.length);

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId.toString() === userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log("Error in my-bookings route:", error);
    res.status(500).json({ message: "Unable to fetch bookings", error: (error as any).message });
  }
});

export default router;
