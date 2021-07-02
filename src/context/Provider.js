import React, { useState } from 'react';
import PostContext from './PostContext';

export default function Provider(props) {
  const [loading, setLoading] = useState();


  const context = {
    loading,
    setLoading,
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