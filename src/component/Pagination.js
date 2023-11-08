import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from "react-paginate";
const Pagination = (props) => {
  const handlePageClick = (e) => {
    props.handlePageClick(e);
  };
 return (
    <>
    <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={Math.ceil(props.total / props.postsPerPage)}
        previousLabel={'Prev'}
        nextLabel={'Next'}
        containerClassName={'pagination'}
        pageLinkClassName={'page-number'}
        previousLinkClassName={'page-number'}
        nextLinkClassName={'page-number'}
        activeLinkClassName={'active'}
      />
      </>
  )
}

export default Pagination;