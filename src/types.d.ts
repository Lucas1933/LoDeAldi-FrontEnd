type FoodData = {
  _id: string;
  name: string;
  price: number;
  description: string;
  thumbnails: string[];
  type: string;
};

type FoodDataForInsertion = {
  name: string;
  price: number;
  description: string;
  /* thumbnails: string[]; to do*/
  type: string;
};

type FoodTypeData = {
  _id: string;
  type: string;
};

type FoodTypeDataForInsertion = {
  type: string;
};

type ModalData = {
  newFood?: boolean;
  newFoodType?: boolean;
  foodToBeEdited?: FoodData;
  foodTypeToBeEdited?: FoodTypeData;
};
