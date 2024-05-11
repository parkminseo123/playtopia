import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FaqTable from './FaqTable.js';
import FaqRow from './FaqRow.js';
import Faqcolumn from './Faqcolumn.js';
import BasicButton from '../../components/button/BasicButton.jsx';
import BasicSearch from '../../components/search/BasicSearch.jsx';
import S from './style.js';
import './faq.css';

const FaqListContainer = () => {
  const [faqlist, setFaqList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchlist, setSearchList] = useState([]);

  const limit = 5; 

  useEffect(() => {
    fetch(`http://localhost:8001/faqlist/list?page=${currentPage}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`http error ${res.status}`);
      }
      return res.json();
    })
    .then(({ faqlist, totalPages,searchlist }) => {
      if (Array.isArray(faqlist)) {
        faqlist.sort((a, b) => a.no - b.no);
        setFaqList(faqlist);
        setTotalPages(totalPages);
        setSearchList(searchlist)
      } else {
        console.error('데이터쪽', faqlist);
      }
    })
    .catch(error => console.error('Fetch error:', error));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); 
  };

  const searchfaq = searchlist.filter((faq) => {
    return faq.title.toLowerCase().includes(searchInput.toLowerCase());
  });


  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, searchfaq.length);


  const page = searchfaq.slice(startIndex, endIndex);


  return (
    <div className="faq-list-container">
      <S.header>
      <h1>FAQ</h1>
      <BasicSearch size={"default"} shape={"default"} classname="serach" placeholder="검색어를 입력하세요." onChange={handleSearchChange}/>
      </S.header>
      
      <FaqTable headersName={['No', '카테고리', '제목', '등록일']} >
      {page.map((item, i) => (
        <FaqRow key={i} className="tablerow">
          <Faqcolumn>{item.no}</Faqcolumn>
          <Faqcolumn className="faq-title">{item.title}</Faqcolumn>
          <Faqcolumn>
            <Link className="faq-link" to={`/faq/explain/${item.no}`}>
              {item.content}
            </Link>
          </Faqcolumn>
          <Faqcolumn>{item.date}</Faqcolumn>
        </FaqRow>
      ))}
      </FaqTable>
      
      <S.pagebutton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <BasicButton
            color={pageNumber === currentPage ? "#FE78C0" : "black"} 
            style={{background:"#fff",borderBottom: pageNumber === currentPage ? "2px solid #FE78C0" : "none"
            , color: pageNumber === currentPage ? "#FE78C0" : "black" 
            }}
            className="pagebutton"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </BasicButton>
        ))}
      </S.pagebutton>
    </div>
  );
};

export default FaqListContainer;
