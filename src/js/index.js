import FoodGenerator from "./component/FoodGenerator.js";
import Kiosk from "./component/Kiosk.js";

const foodGenerator = new FoodGenerator();
const kiosk = new Kiosk()

await foodGenerator.setup();
kiosk.setup();