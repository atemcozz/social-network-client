import React, {createContext, useState} from 'react';
import Modal from "../../../ui/Modal/Modal";
import Button from "../../../ui/Button/Button";
import {GrClose} from "react-icons/gr";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import {Post} from "./Post";


export const PostModal = ({post, onCancel}) => {


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