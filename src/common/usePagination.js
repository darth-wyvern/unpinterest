import { useState } from "react"
import { useSearchParams } from "react-router-dom";

/**
 * inRange is a function sure value number is in range
 * 
 * @param {number} number 
 * @param {number} min 
 * @param {number} max 
 * @returns number in range min and max
 */
const inRange = (number, min, max) => {
  return (number < min) ? min : (number > max) ? max : number
}

/**
 * usePagination2
 * 
 * @param {Object} data - pagination data
 * @returns component
 */
function usePagination({ totalPage, current }) {

  const [searchParams,] = useSearchParams();
  const _page = searchParams.get("page");

  const numNode = 4;

  const [currentPage, gotoPage] = useState(_page | current)

  let minNodePage = Math.round(currentPage - numNode / 2)
  let maxNodePage = Math.round(currentPage + numNode / 2)

  minNodePage = inRange(minNodePage, 1, totalPage)
  maxNodePage = inRange(maxNodePage, 1, totalPage)

  const listNode = (maxNodePage - minNodePage) ? Array.apply(null, Array(maxNodePage - minNodePage + 1)).map(
    function (_, i) {
      return i + minNodePage;
    }
  ) : [1];

  const prev = () => {
    gotoPage(inRange(currentPage - 1, 1, totalPage))
  }

  const next = () => {
    gotoPage(inRange(currentPage + 1, 1, totalPage))
  }

  const jumpPrev = () => {
    gotoPage(inRange(currentPage - 5, 1, totalPage))
  }

  const jumpNext = () => {
    gotoPage(inRange(currentPage + 5, 1, totalPage))
  }

  return { prev, next, currentPage, gotoPage, jumpPrev, jumpNext, listNode }
}

export default usePagination