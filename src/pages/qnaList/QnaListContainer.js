import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import QnaTable from './QnaTable.js';
import QnaRow from './QnaRow.js';
import Qnacolumn from './Qnacolumn.js';
import BasicButton from '../../components/button/BasicButton.jsx';
import S from './style.js';
import BasicSearch from '../../components/search/BasicSearch.jsx';

const QnaListContainer = () => {
  const [qnalist, setQnaList] = useState([]);
  const [searchlist, setSearchList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [searchInput, setSearchInput] = useState("");

  const limit = 5; 

  useEffect(() => {
    fetch(`http://localhost:8004/qnalist/list?page=${currentPage}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`http error ${res.status}`);
        }
        return res.json();
      })
      .then(({ qnalist, totalPages, searchlist }) => {
        if (Array.isArray(qnalist)) {
          qnalist.sort((a, b) => a.no - b.no);
          setQnaList(qnalist);
          setTotalPages(totalPages);
          setSearchList(searchlist); 
        } else {
          console.error('데이터쪽', qnalist, searchlist);
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

  const searchqnas = searchlist.filter((qna) => {
    return qna.category.toLowerCase().includes(searchInput.toLowerCase());
  });


  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, searchqnas.length);


  const page = searchqnas.slice(startIndex, endIndex);

  return (
    <>
      <S.header>
        <h1>QnA</h1>
        <BasicSearch size={"default"} shape={"default"} classname="serach" placeholder="검색어를 입력하세요." onChange={handleSearchChange}
        />
      </S.header>

      <S.contanier>
        <QnaTable headersName={['No', '카테고리', '제목', '등록일']}>
          {page.map((item, i) => (
            <QnaRow key={i} className="tablerow">
              <Qnacolumn>{item.no}</Qnacolumn>
              <Qnacolumn className="qna-title">{item.category}</Qnacolumn>
              <Qnacolumn>
                <Link className="qna-link" to={`/qna/explain/${item.no}`}>{item.title}</Link>
              </Qnacolumn>
              <Qnacolumn>{item.date}</Qnacolumn>
            </QnaRow>
          ))}
        </QnaTable>
        
        <S.pagebutton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <BasicButton
              color={pageNumber === currentPage ? "#FE78C0" : "black"} 
              style={{
                background:"#fff",
                borderBottom: pageNumber === currentPage ? "2px solid #FE78C0" : "none",
                color: pageNumber === currentPage ? "#FE78C0" : "black" 
              }}
              className="pagebutton"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </BasicButton>
          ))}
        </S.pagebutton>

        <S.button>
          <BasicButton style={{ marginLeft: '900px' }} size={"small"} shape={"default"} variant={"main"} color={"white"}>
            <Link style={{ color: "#fff" }} to={`/qna/register`}>
              글쓰기
            </Link>
          </BasicButton>
        </S.button>
      </S.contanier>
    </>
  );
};

export default QnaListContainer;
