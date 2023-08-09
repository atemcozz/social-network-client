import React from 'react';
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import Heading from "../../components/UI/Heading";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Post from "../../components/Post/Post";
import CommentSection from "../../components/CommentSection/CommentSection";

const ErrorBoundaryPage = () => {
  return (
    <div className="flex justify-center">
      <ErrorMessage>Произошла неизвестная ошибка. Попробуйте перезагрузить страницу</ErrorMessage>
    </div>
  );
};

export default ErrorBoundaryPage;