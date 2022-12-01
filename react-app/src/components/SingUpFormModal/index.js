import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./SignupForm";

function SignupFormModal({startedButton}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span
        className='signup-text-link'
        onClick={() => setShowModal(true)}
      >
        Sign Up
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
