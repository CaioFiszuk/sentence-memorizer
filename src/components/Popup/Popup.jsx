import Modal from 'react-modal';
import './Popup.css';

Modal.setAppElement('#root');

function Popup({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      overlayClassName="popup__overlay" 
      className="popup__content" 
    >
      {children}
    </Modal>
  );
}

export default Popup;