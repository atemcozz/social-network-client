import React, {createContext, useState} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import {GrClose} from "react-icons/gr";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Form from "../../components/UI/Form";
import Input from "../../components/UI/Input/Input";
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";


const PostModal = ({post, onCancel}) => {


  if (!post) return null;
  return (

    <Modal onBgClick={onCancel}>
      <Modal.Header>
        Пост
        <Button variant={"secondary"} onClick={onCancel}> <GrClose size={"16px"}/></Button>
      </Modal.Header>
      <Modal.Content>
        <div className={"w-full max-w-2xl"}>
          <Post content={post} recursive={false}/>
        </div>
      </Modal.Content>

    </Modal>

  );
};

export default PostModal;