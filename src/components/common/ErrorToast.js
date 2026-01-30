import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import './ErrorToast.css';

const ErrorToast = ({ errors, onClose, onNavigateToPage }) => {
  if (!errors || errors.length === 0) return null;

  const errorsByPage = errors.reduce((acc, error) => {
    if (!acc[error.page]) acc[error.page] = [];
    acc[error.page].push(error);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      <motion.div
        className="error-toast-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="error-toast-container"
          initial={{ scale: 0.8, y: -50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: -50 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="error-toast-header">
            <div className="error-toast-title">
              <FiAlertCircle className="error-icon" />
              <h3>Incomplete Fields</h3>
            </div>
            <button onClick={onClose} className="error-toast-close">
              <FiX />
            </button>
          </div>

          <div className="error-toast-content">
            <p className="error-toast-subtitle">
              Please fill in the following required fields:
            </p>

            {Object.keys(errorsByPage).sort().map((page) => (
              <motion.div
                key={page}
                className="error-page-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: parseInt(page) * 0.05 }}
              >
                <div className="error-page-header">
                  <span className="page-badge">Page {page}</span>
                  <button
                    className="navigate-btn"
                    onClick={() => {
                      onNavigateToPage(parseInt(page));
                      onClose();
                    }}
                  >
                    Go to Page
                  </button>
                </div>
                <ul className="error-list">
                  {errorsByPage[page].map((error, index) => (
                    <motion.li
                      key={error.field}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.03 }}
                    >
                      • {error.label}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="error-toast-footer">
            <button onClick={onClose} className="error-toast-btn">
              Got it!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorToast;
