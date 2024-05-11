import React, { useState, useEffect } from 'react';
import S from './style.js';
import { Link } from 'react-router-dom';
import LostnFoundTable from './LostnFoundTable.js';
import LostnFoundTableRow from './LostnFoundTableRow.js';
import LostnFoundTableColumn from './LostnFoundTableColumn.js';
import BasicSearch from '../../components/search/BasicSearch.jsx';
import BasicButton from '../../components/button/BasicButton.jsx';

const LostnFoundListEverland = () => {
  const [lostList, setLostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);
  const limit = 5;

  useEffect(() => {
    fetch(`http://localhost:8010/lostnfoundlist/list?page=${currentPage}&company=everland`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then(({ lostnfoundlist, totalPages, searchlist }) => {
        setLostList(lostnfoundlist);
        setTotalPages(totalPages);
        setSearchList(searchlist);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const searcheverland = lostList.filter((everland) => {
    return everland.item.toLowerCase().includes(searchInput.toLowerCase());
  });


  return (
    <>
      <S.margin></S.margin>
      <S.head>
        <S.header>
          <h1>분실물 리스트</h1>
        </S.header>
        <S.title>
          <Link to={"/lostnfound/list/lotteworld"}><S.lotteworld>롯데월드</S.lotteworld></Link>
          <S.everland color='#1FB1D9'>에버랜드</S.everland>
          <Link to={"/lostnfound/list/seoulland"}><S.seoulland>서울랜드</S.seoulland></Link>
        </S.title>
        <S.basicbox>
          <BasicSearch
            size={"default"}
            shape={"default"}
            className="search"
            placeholder="검색어를 입력하세요."
            onChange={handleSearchChange}
          />
          <BasicButton size={"small"} shape={"default"} variant={"main"} color={"white"}>
            <Link to={`/lostnfound/register/everland`}>글쓰기</Link>
          </BasicButton>
        </S.basicbox>
      </S.head>

      <LostnFoundTable headersName={['No', '습득물', '습득장소', '습득날짜', '처리결과']}>
        {searcheverland
        .filter(item => item.company === "everland")
        .map((item, i) => (
          <LostnFoundTableRow key={i} className="tablerow">
            <LostnFoundTableColumn>{item.no}</LostnFoundTableColumn>
            <LostnFoundTableColumn>{item.item}</LostnFoundTableColumn>
            <LostnFoundTableColumn>
              <Link className="found-link" to={`/lostnfound/explain/${item.no}/${item.company}`}>
                {item.found}
              </Link>
            </LostnFoundTableColumn>
            <LostnFoundTableColumn>{item.date}</LostnFoundTableColumn>
            <LostnFoundTableColumn>{item.result}</LostnFoundTableColumn>
          </LostnFoundTableRow>
        ))}
      </LostnFoundTable>

      <S.pagebutton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <BasicButton
            key={pageNumber}
            className="pagebutton"
            color={pageNumber === currentPage ? "#FE78C0" : "black"}
            style={{
              background: "#fff",
              borderBottom: pageNumber === currentPage ? "2px solid #FE78C0" : "none",
              color: pageNumber === currentPage ? "#FE78C0" : "black"
            }}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </BasicButton>
        ))}
      </S.pagebutton>
    </>
  );
};

export default LostnFoundListEverland;
