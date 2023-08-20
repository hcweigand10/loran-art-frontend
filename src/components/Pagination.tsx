import React, {useState} from 'react'

interface props {
  postsPerPage: number,
  totalPosts: number,
  paginateFront: () => void,
  paginateBack: () => void,
  currentPage: number
}

const Pagination = (props: props) => {

  return (
    <div className='py-2 text-right'>
      <div>
        <p className='text-lg text-gray-700'>
          Showing {" "}
          <span className='font-medium'>{props.currentPage * props.postsPerPage - 10 + 1}{" "}</span>
          to
          <span className='font-medium'> {props.currentPage * props.postsPerPage > props.totalPosts ? props.totalPosts : props.currentPage * props.postsPerPage} </span>
          of
          <span className='font-medium'> {props.totalPosts} </span>
          results
        </p>
      </div>
      <nav className='block'></nav>
      <div>
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
          aria-label='Pagination'
        >
          <button
            onClick={() => {
              props.paginateBack();
            }}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${props.currentPage === 1 ? "text-gray-500" : "text-gray-800 hover:bg-gray-50"}`}
            disabled={props.currentPage === 1 ? true : false}
          >
            <span>Previous</span>
          </button>

          <button
            onClick={() => {
              props.paginateFront();
            }}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${props.currentPage * props.postsPerPage >= props.totalPosts ? "text-gray-500" : "text-gray-800 hover:bg-gray-50"}`}
            disabled={props.currentPage * props.postsPerPage >= props.totalPosts ? true : false}
          >
            <span>Next</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Pagination