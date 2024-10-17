import express from "express";
import Coctail from "../models/Coctail";
import { Request, Response, NextFunction } from "express";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import mongoose from "mongoose";
import permit from "../middleware/permit";

const coctailsRouter = express();

coctailsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cocktail = await Coctail.find();
      res.send(cocktail);
    } catch (error) {
      next(error);
    }
  }
);


coctailsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cocktail = await Coctail.findById(req.params.id).populate("coctail");
     res.send(cocktail);
  } catch (error) {
     next(error);
  }
});

coctailsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const coctail = await Coctail.create({
        user: req.user?._id,
        name: req.body.name,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe,
        image: req.file ? req.file.filename : null,
      });

      await coctail.save();

      res.send(coctail);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
         res.status(400).send(error);
      }
       next(error);
    }
  }
);

coctailsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const cocktailId = req.params.id;
      const cocktail = await Coctail.findById(cocktailId);
      if (!cocktail) {
         return res.status(404).send({ error: "Кокотейль не найден!" });
      }

      await Coctail.findByIdAndDelete(cocktail);
       res.send({ message: "Коктейль удален!" });
    } catch (error) {
      next(error);
    }
  }
);


coctailsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const cocktailId = req.params.id;
      const cocktail = await Coctail.findById(cocktailId);

      if (!cocktail) {
        return res.status(404).send({ message: "Коктейль не найден!" });
      }

      cocktail.isPublished = !cocktail.isPublished;
      cocktail.save();

      return res.send(cocktail);
    } catch (error) {
      next(error);
    }
  }
);

export default coctailsRouter;