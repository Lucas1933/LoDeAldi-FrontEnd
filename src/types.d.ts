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

type FormProps = {
  newFood?: boolean;
  newFoodType?: boolean;
  foodToBeEdited?: FoodData;
  foodTypeToBeEdited?: FoodTypeData;
};

type FormInputData = FoodDataForInsertion &
  FoodTypeDataForInsertion &
  FoodData &
  FoodTypeData;

type AddNewButtonProps = {
  actionText: string;
  icon: string;
  modalData: FormProps;
  handleModalData(modalData: FormProps): void;
  handleDisplayModal(displayModal: boolean): void;
};

type CreationButtonsContainerProps = {
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalProps): void;
};

type FoodCardProps = {
  food: FoodData;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: FormProps): void;
};

type FoodCardListerProps = {
  selectedFoodType: string;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalProps): void;
};
type ModalProps = FormProps & {
  displayModal: boolean;
  modalData: FormProps;
  handleDisplayModal(displayModal: boolean): void;
};

type MainProps = {
  selectedFoodType: string;
};

type NavProps = {
  updateSelectedFoodType(foodType: string): void;
  foodTypes: FoodTypeData[];
};
type NavBarProps = {
  updateSelectedFoodType(foodType: string): void;
};
