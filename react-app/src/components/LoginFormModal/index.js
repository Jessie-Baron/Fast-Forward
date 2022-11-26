import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";


function LoginFormModal({ nav }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!nav && (
        <button
          className="signIn"
          // id="openLogin"
          onClick={() => setShowModal(true)}
        >
          Sign In
        </button>
      )}
      {nav && (
        <button
          className="start__reading"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Start Reading
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
