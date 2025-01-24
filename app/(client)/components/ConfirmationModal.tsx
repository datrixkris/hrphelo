interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal" open>
      <div className="modal-box">
        <h3 className="text-lg font-bold">Confirm Action</h3>
        <p>{message}</p>
        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-primary">
            Confirm
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
};

export default ConfirmationModal;
