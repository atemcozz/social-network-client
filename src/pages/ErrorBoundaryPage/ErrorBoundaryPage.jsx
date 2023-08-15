import React from 'react';
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";

const ErrorBoundaryPage = () => {
  return (
    <div className="flex justify-center">
      <ErrorMessage>Произошла неизвестная ошибка. Попробуйте перезагрузить страницу</ErrorMessage>
    </div>
  );
};

export default ErrorBoundaryPage;