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

/* type FormInputData = FoodDataForInsertion &
  FoodTypeDataForInsertion &
  FoodData &
  FoodTypeData; */
type FormInputData =
  | FoodDataForInsertion
  | FoodTypeDataForInsertion
  | FoodData
  | FoodTypeData;

type AddNewButtonProps = {
  actionText: string;
  icon: string;
  modalData: ModalData;
  handleModalData(modalData: ModalData): void;
  handleDisplayModal(displayModal: boolean): void;
};

type CreationButtonsContainerProps = {
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
};

type FoodCardProps = {
  food: FoodData;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
};

type FoodCardListerProps = {
  selectedFoodType: string;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
};
type ModalProps = {
  displayModal: boolean;
  modalData: ModalData;
  handleDisplayModal(displayModal: boolean): void;
};
type ModalData = {
  newFood?: boolean;
  newFoodType?: boolean;
  foodToBeEdited?: FoodData;
  foodTypeToBeEdited?: FoodTypeData;
};
type MainProps = {
  selectedFoodType: string;
  displayTypes: boolean;
};

type NavProps = {
  updateSelectedFoodType(foodType: string): void;
  updateSelectedType(displayTypes: boolean): void;
  foodTypes: FoodTypeData[];
};
type NavBarProps = {
  updateSelectedFoodType(foodType: string): void;
  updateSelectedType(displayTypes: boolean): void;
};

type TypeListerProps = {
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
};
type TypeCardProps = {
  typeProp: FoodTypeData;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
};

type ListersContainerProps = {
  selectedFoodType: string;
  showTypes: boolean;
  handleDisplayTypes(displayModal: boolean): void;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
};
