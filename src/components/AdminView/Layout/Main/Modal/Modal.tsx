import NewFoodForm from "./Forms/NewFoodForm";
import NewTypeForm from "./Forms/NewTypeForm";
import EditFoodForm from "./Forms/EditFoodForm";
import EditTypeForm from "./Forms/EditTypeForm";
import LoadingBackDrop from "./Forms/LoadingBackDrop/LoadingBackDrop";
import { useState, useEffect } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

function Modal({
  displayModal,
  modalData,
  handleDisplayModal,
  handleIsResourceChanged,
}: {
  displayModal: boolean;
  modalData: ModalData;
  handleDisplayModal(displayModal: boolean): void;
  handleIsResourceChanged(isResourceChanged: { hasChanged: boolean }): void;
}) {
  const [showModal, setShowModal] = useState(displayModal);
  const [showLoading, setShowLoading] = useState(false);
  const { newFood, newFoodType, foodToBeEdited, foodTypeToBeEdited } =
    modalData;

  useEffect(() => {
    setShowModal(displayModal);
  }, [displayModal]);

  return (
    <div>
      <TEModal
        show={showModal}
        setShow={setShowModal}
        scrollable
        staticBackdrop
      >
        <TEModalDialog centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => handleDisplayModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              {newFood && (
                <NewFoodForm
                  handleShowLoading={setShowLoading}
                  handleDisplayModal={handleDisplayModal}
                  handleIsResourceChanged={handleIsResourceChanged}
                />
              )}
              {newFoodType && (
                <NewTypeForm
                  handleShowLoading={setShowLoading}
                  handleDisplayModal={handleDisplayModal}
                  handleIsResourceChanged={handleIsResourceChanged}
                />
              )}
              {foodToBeEdited && (
                <EditFoodForm
                  foodToBeEdited={foodToBeEdited}
                  handleShowLoading={setShowLoading}
                  handleDisplayModal={handleDisplayModal}
                  handleIsResourceChanged={handleIsResourceChanged}
                />
              )}
              {foodTypeToBeEdited && (
                <EditTypeForm
                  foodTypeToBeEdited={foodTypeToBeEdited}
                  handleShowLoading={setShowLoading}
                  handleDisplayModal={handleDisplayModal}
                  handleIsResourceChanged={handleIsResourceChanged}
                />
              )}
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => handleDisplayModal(false)}
                >
                  Cerrar
                </button>
              </TERipple>
            </TEModalFooter>
            {showLoading && (
              <LoadingBackDrop loadingText="Guardando cambios..." />
            )}
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

export default Modal;
