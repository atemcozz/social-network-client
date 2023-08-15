import React from 'react';
import Button from "../../ui/Button/Button";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {Link} from "react-router-dom";

const Paginator = ({pagesCount, currentPage = 1, neighboursCount = 2, onPageChange, route}) => {
  function getPages() {

    const pages = [currentPage];
    let left = Math.floor(neighboursCount / 2);
    let right = left;
    let count = left;

    for (let i = currentPage - 1; i >= Math.max(currentPage - count, 1); i--, left--) {
      pages.splice(0, 0, i);
    }
    for (let i = currentPage + 1; i <= Math.min(currentPage + count, pagesCount); i++, right--) {
      pages.push(i);
    }
    const remain = left + right;
    const first = pages[0];
    const last = pages[pages.length - 1];
    for (let i = first - 1; i >= Math.max(first - remain, 1); i--) {
      pages.splice(0, 0, i);
    }
    for (let i = last + 1; i <= Math.min(last + remain, pagesCount); i++) {
      pages.push(i);
    }
    return pages;
  }

  const pages = getPages();
  return (
    <div className={"flex gap-1 justify-center md:px-4 py-4 "}>
      {/*{currentPage > 1 &&*/}
      {/*  <Link to={`?page=${currentPage - 1}`}>*/}
      {/*    <Button>*/}
      {/*      <FaAngleLeft size={"24px"}/>*/}
      {/*    </Button>*/}
      {/*  </Link>}*/}
      {pages[0] > 1 &&
        <>
          <Button
            className={"w-10 h-10 justify-center"}
            variant={"outlined"}
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
          {pages[0] > 2 &&
            <span>...</span>
          }

        </>
      }
      {pages.map((page) =>
        <Button
          className={"w-10 h-10 justify-center"}
          variant={page === currentPage ? "primary" : "outlined"}
          onClick={() => onPageChange(page)}
          key={page}
        >
          {page}
        </Button>)}
      {pages[pages.length - 1] < pagesCount &&
        <>
          {pages[pages.length - 1] < pagesCount - 1 && <span>...</span>}

          <Button
            className={"w-10 h-10 justify-center"}
            variant={"outlined"}
            onClick={() => onPageChange(pagesCount)}>
            {pagesCount}
          </Button>
        </>
      }
      {currentPage < pagesCount &&
        <Button onClick={() => onPageChange(currentPage + 1)}>
          <FaAngleRight size={"24px"}/>
        </Button>}
    </div>
  );
};

export default Paginator;