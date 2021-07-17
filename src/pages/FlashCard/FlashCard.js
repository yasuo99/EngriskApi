import React, { Component, useEffect, useState } from "react";
import wordCategoryApi from "../../api/2.0/wordCategoryApi";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import "react-multi-carousel/lib/styles.css";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import Carousel from "react-multi-carousel";
import Search from "../../components/search/Search";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const FlashCard = ({ }) => {
  const [categories, setCategories] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 4,
    items: []
  })
  const [query, setQuery] = useState('')
  useEffect(() => {
    fetchWordCategories();
  }, [categories.currentPage, categories.pageSize, query])
  async function fetchWordCategories() {
    const params = {
      currentPage: categories.currentPage,
      pageSize: categories.pageSize,
      search: query,
      learn: true
    }
    const result = await wordCategoryApi.getAll(params);
    setCategories(result);
  };
  const handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  // inform = (length) => {
  //   if (length == 0) {
  //     toast("Chủ đề này hiện chưa có từ vựng", { type: "info" });
  //   }
  // };
  function fetchMore() {
    setCategories({
      ...categories,
      pageSize: categories.pageSize + 6
    })
  }
  function search(query) {
    setQuery(query)
    setCategories({
      ...categories,
      currentPage: 1
    })
  }
  return (
    <div id="wrapper">
      <SubMenuClient></SubMenuClient>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderClient></HeaderClient>
          <main id="flashcard">
            <div className="container">
              <div className='d-flex justify-content-between'>
                <select className='pagination-select' onChange={handleChange}>
                  <option>Lọc theo tag</option>
                  <option>Hàng ngày</option>
                  <option>Giao Tiếp</option>
                  <option>Toeic</option>
                </select>
                <Search queryFunction={search}></Search>
              </div>

              <div className="boxCommunicate">
                <h5>CHỦ ĐỀ GIAO TIẾP HẰNG NGÀY</h5>
                <div className="container">
                  <div className="card-columns">
                    {categories.items.map((category, index) =>
                      <Link to={`/card-detail/${category.id}`} disabled>
                        <div className="card" key={index}>
                          <img src={category.categoryImage} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{category.categoryName}</h5>
                            <p className="card-text">Số từ vựng: {category.words.length}</p>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button className='btn border rounded border-primary' onClick={() => fetchMore()}>
                      Hiển thị thêm...
                    </button>
                  </div>
                </div>
                <div className="gachchan"></div>
              </div>
              <div className="boxToeic">
                <h5>CHỦ ĐỀ LUYỆN THI TOEIC</h5>
                <div className="container">

                </div>
              </div>
            </div>
          </main>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}
export default FlashCard;
