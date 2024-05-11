import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import S from './style.js';

const FaqExplain = () => {
  const { id } = useParams(); 
  const [faqexplain, setFaqExplain] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8001/faqexplain/list`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setFaqExplain(data.faqexplain);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []); 

  return (
    <>
      <S.header>FAQ </S.header>
      <S.container2>
        {faqexplain.map((item, i) => (
          <div key={i} >
            {item.no.toString() === id && (
              <S.container1 >
                <S.title >
                  <p>Q. {item.title}</p>
                </S.title>
                <S.content>
                  <S.a>A. </S.a>
                  <p>{item.content}</p>
                </S.content>
              </S.container1>
            )}
          </div>
        ))}
      </S.container2>
    </>
  );
};

export default FaqExplain;
