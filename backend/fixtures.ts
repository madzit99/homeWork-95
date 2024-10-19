import config from "./config";
import Cocktail from "./models/Cocktail";
import User from "./models/User";
import mongoose from "mongoose";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  const collections = ["users", 'cocktails'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [admin, user] = await User.create(
    {
      username: "admin@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      role: "admin",
      token: crypto.randomUUID(),
      displayName: "admin",
      avatar: "fixtures/miyagi.webp",
    },
    {
      username: "user@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      token: crypto.randomUUID(),
      displayName: "user",
      avatar: "fixtures/djigan.jpeg",
    }
  );

  await Cocktail.create(
    {
      user: admin,
      name: "Маргарита",
      image: "fixtures/margarita.jpeg",
      recipe:
        "Соберите все ингредиенты. Насыпьте соль на небольшую тарелку. Слегка смочите ободок коктейльного бокала или бокала для маргариты влажным бумажным полотенцем. Окуните смоченный ободок в соль, чтобы покрыть его. Отставьте в сторону. Смешайте текилу, бренди со вкусом апельсина и сок лайма в шейкере для коктейлей. Добавьте лед и встряхивайте до охлаждения. Процедите в коктейльный бокал с соляной кромкой или в бокал для маргариты с соляной кромкой, наполненный льдом. Украсьте кружочком лайма.",
      ingredients: [
        { nameIngredients: "соль", amountIngredients: "1 столовая ложка" },
        { nameIngredients: "текила", amountIngredients: "½ жидких унций" },
        {
          nameIngredients: "ликер со вкусом апельсина",
          amountIngredients: "1 жидкая унция",
        },
        { nameIngredients: "Сок лайма", amountIngredients: "½ жидкой унции" },
        { nameIngredients: "Лед", amountIngredients: "1 кубик" },
        { nameIngredients: "Лайм", amountIngredients: "1 долька" },
      ],
      isPublished: true,
    },
    {
      user: user,
      name: "Текила",
      image: "fixtures/tequila.jpg",
      recipe:
        "Наполните высокий стакан 1 1/2 стаканами льда и отставьте в сторону. Смешайте апельсиновый сок и текилу в шейкере для коктейлей; добавьте оставшийся 1 стакан льда. Закройте и встряхивайте, пока внешняя поверхность шейкера не покроется инеем. Процедите в подготовленный высокий стакан. Медленно влейте гренадин и дайте отстояться. Размешайте перед употреблением.",
      ingredients: [
        { nameIngredients: "Лед", amountIngredients: "2 ½ стакана" },
        {
          nameIngredients: "апельсиновый сок",
          amountIngredients: "4 унции",
        },
        { nameIngredients: "текила", amountIngredients: "2 унции" },
        {
          nameIngredients: "сироп гренадин",
          amountIngredients: "¾ унции",
        },
      ],
      isPublished: true,
    }
  );

  await db.close();
};

void run();
