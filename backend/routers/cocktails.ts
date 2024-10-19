import express from "express";
import Cocktail from "../models/Cocktail";
import { Request, Response, NextFunction } from "express";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import mongoose from "mongoose";
import permit from "../middleware/permit";

const cocktailsRouter = express();

cocktailsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let cocktails;

      if (req.query.user) {
        cocktails = await Cocktail.find({ user: req.query.user }).populate(
          "user",
          "displayName"
        );
      } else {
        cocktails = await Cocktail.find().populate("user", "displayName");
      }

      res.send(cocktails);
      return;
    } catch (error) {
      next(error);
    }
  }
);

cocktailsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cocktail = await Cocktail.findById(req.params.id);
      res.send(cocktail);
    } catch (error) {
      next(error);
    }
  }
);

cocktailsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const ingredients = JSON.parse(req.body.ingredients);
      const cocktail = await Cocktail.create({
        user: req.user?._id,
        name: req.body.name,
        ingredients: ingredients,
        recipe: req.body.recipe,
        image: req.file ? req.file.filename : null,
      });

      await cocktail.save();

      res.send(cocktail);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).send(error);
      } else {
        next(error);
      }
    }
  }
);

cocktailsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const cocktailId = req.params.id;
      const cocktail = await Cocktail.findById(cocktailId);
      if (!cocktail) {
        res.status(404).send({ error: "Кокотейль не найден!" });
        return;
      }

      await Cocktail.findByIdAndDelete(cocktail);
      res.send({ message: "Коктейль удален!" });
    } catch (error) {
      next(error);
    }
  }
);

cocktailsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const cocktailId = req.params.id;
      const cocktail = await Cocktail.findById(cocktailId);

      if (!cocktail) {
        res.status(404).send({ message: "Коктейль не найден!" });
        return;
      }

      cocktail.isPublished = !cocktail.isPublished;
      cocktail.save();

      res.send(cocktail);
    } catch (error) {
      next(error);
    }
  }
);

export default cocktailsRouter;
