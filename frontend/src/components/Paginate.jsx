import React from 'react'
import { Pagination } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'


const Paginate = ({ pages, page, keyword='', isAdmin=false }) => {
    if(keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                        // <Link key={x + 1} to={{ pathname: "/", search: `?keyword=${keyword}&page=${x + 1}` }}>
                            <Pagination.Item key={x + 1} active={(x + 1) === page}>
                                <Link to={!isAdmin ? `/?keyword=${keyword}&page=${x + 1}` : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`} style={{textDecoration:"none", color:'#FF6600'}}>
                                    {x + 1}
                                </Link>
                                
                            </Pagination.Item>
                        // </Link>
                    ))}
            </Pagination>
            // to={`/?keyword=${keyword}&page=${x + 1}`}
             
        )
    )
}

export default Paginate