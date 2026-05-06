// src/hooks/useConfirmPassword.js
import { useState, useCallback, useRef } from 'react';

const useConfirmPassword = (password) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;
  const passwordConfirmInputRef = useRef(null);
  const handleConfirmPasswordChange = useCallback((text) => {
    const trimmedPass = text.trim();
    setConfirmPassword(trimmedPass);
    setTimeout(() => {
      if (password !== text) {
        setPasswordConfirmError("Passwords do not match.");
      } else if (!strongPasswordRegex.test(text)) {
        setPasswordConfirmError("At least 8 characters long, one uppercase letter, one number, and one special character.");
      } else {
        setPasswordConfirmError("");
      }
    }, 500);
  }, [password]);

  const togglePasswordConfirmVisibility = useCallback(() => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  }, [isPasswordConfirmVisible]);

  return {
    confirmPassword,
    passwordConfirmError,
    isPasswordConfirmVisible,
    handleConfirmPasswordChange,
    togglePasswordConfirmVisibility,
    setConfirmPassword,
    setIsPasswordConfirmVisible,
    passwordConfirmInputRef
  };
};

export default useConfirmPassword;