import { useState } from "react";

/**
 * usePagination is a hook for the use of pagination
 * @param {number} totalPage - number of pages
 * @returns 
 */
function usePagination(totalPage) {
  const [currentPage, gotoPage] = useState(1)
  const maxDisplayNodePagination = 5;

  const [offset, setOffset] = useState(0);
  const listNode = Array.apply(null, Array(offset + maxDisplayNodePagination - offset)).map(function (_, i) { return i + offset + 1; }) //list.slice(offset, offset + maxDisplayNodePagination);

  const prev = () => {
    const _prev = (currentPage - 1 < 1 ? currentPage : currentPage - 1);
    gotoPage(_prev);
    if (offset && currentPage < offset + 1 + maxDisplayNodePagination / 2) {
      setOffset(offset - 1);
    }
  }

  const next = () => {
    const _next = (currentPage + 1 > totalPage ? currentPage : currentPage + 1);
    gotoPage(_next);
    if (
      maxDisplayNodePagination + offset < totalPage &&
      currentPage + 1 > maxDisplayNodePagination / 2 + offset + 1) {
      setOffset(currentPage - 2);
    }
  }

  return { currentPage, gotoPage, listNode, next, prev };
}

export default usePagination;