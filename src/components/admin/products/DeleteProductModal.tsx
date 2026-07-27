import "../../../styles/DeleteProductModal.css";

type Props = {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
};
function DeleteProductModal({

  productName,

  onConfirm,

  onCancel,

}: Props) {

  return (

    <div className="modal-overlay">

      <div className="delete-modal">

        <h2>

          Delete Product

        </h2>

        <p>

          Are you sure you want to delete

          <strong> {productName} </strong>

          ?

        </p>

        <div className="delete-buttons">

          <button

            className="cancel-btn"

            onClick={onCancel}

          >

            Cancel

          </button>

          <button

            className="delete-btn"

            onClick={onConfirm}

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteProductModal;