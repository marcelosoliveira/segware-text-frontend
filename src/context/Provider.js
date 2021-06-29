import React, { useState } from 'react';
import PostContext from './PostContext';

export default function Provider(props) {


  const context = {

  };
  
  const { children } = props;

  return (
    <PostContext.Provider
      value={ context }
    >
      {children}
    </PostContext.Provider>
  );
}