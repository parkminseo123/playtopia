import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import S from './style.js';

let currentNo = 22; 
const QnaExplain = () => {
  const { id } = useParams();
   const [qnaexplain , setQnaExplain] = useState([])

   useEffect(() => {
    fetch(`http://localhost:8004/qnaexplain/list`)
    .then((res) => {
      if(!res.ok){
        throw new Error(`HTTP error ${res.status}`);
      }
      return res.json();
    }).then((data) => {
      setQnaExplain(data.qnaexplain);
    }).catch((error) => {
      console.error('Fetch error:', error);
    })
   }, []);

   
  return (
    <>
    
     <S.header>QnA</S.header> 
     <S.container2>
        {qnaexplain.map((item, i) => (
          <div key={i} >
            {item.no.toString() === id && (
              <S.container1 >
                <S.title >
                  <p>Q.</p>
                  <S.padding >{item.title}</S.padding >
                </S.title>
                <S.namebox >
                <p>{item.name}님, 문의하신 질문에 대한 답변 드립니다.</p>
                </S.namebox >
                <S.content>
                  
                  <S.a>A. </S.a>
                  <S.padding>{item.content}</S.padding>
                </S.content>
              </S.container1>
            )}
          </div>
        ))}
      </S.container2>
    </>
  );
};

export default QnaExplain;