import React from 'react'

const pagination = ({ currentPosts, postPerPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(currentPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => {
        return <button key={index}>{page}</button>;
      })}
    </div>
  );
};

export default pagination