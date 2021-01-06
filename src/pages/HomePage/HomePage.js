import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sectionApi from '../../api/sectionApi';
import HeaderAdmin from '../../components/admin/HeaderAdmin';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';


class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      params: {
        currentPage: 1,
        pageSize: 4
      },
      hasMore: true
    };
    this.isComponentMounted = false;
  }
  async componentDidMount() {
    this.isComponentMounted = true;
    const result = await this.fetchSections(this.state.params, this.props.isLoggedIn);
    console.log(result);
    if (result.length < 4) {
      this.setState({
        hasMore: false
      })
    }
    if (this.isComponentMounted) {
      this.setState({
        sections: result
      });
    }
  }

  fetchSections = async (params, auth) => {
    return await sectionApi.getAll(params, auth);
  }
  fetchMoreSections = async () => {
    this.setState({
      params: { ...this.state.params, currentPage: this.state.params.currentPage + 1 }
    })
    var result = await sectionApi.getAll(this.state.params, this.props.isLoggedIn).catch((error) => {
      console.log(error);
      this.setState({
        hasMore: false
      });
      return;
    });
    console.log(result);
    if (result.length === 0) {
      this.setState({
        hasMore: false
      });
      return;
    }
    console.log(this.state);
    if (this.isComponentMounted) {
      this.setState({
        sections: this.state.sections.concat(result)
      })
    }
  }
  render() {
    const renderSections = this.state.sections.map((section) =>
      <div key={section.id} className="card-hoc pt-2 mb-3">
        <div className="row">
          <div className="col-2 text-center img-section">
            <img src={section.photoUrl || "/image/welcome.jpg"} alt="welcome" className="img-hoc" />
          </div>
          <div className="col-8">
            <a href="#" className="link-title">{section.sectionName}</a>
            <p>{section.description}</p>
            <p>test</p>
          </div>
          <div className="col-2 pr-4">
            <div className="progress">
              <div className="progress-bar progress-bar-success" style={{ width: (section.dpa / (section.totalQuizzes === 0 ? 1 : section.totalQuizzes)) * 100 }}>
                <span className="text-light pl-2">{(section.dpa / (section.totalQuizzes === 0 ? 1 : section.totalQuizzes)) * 100}%</span>
              </div>
            </div>
            <div>
              <Link className="btn btn-primary do-btn" to={`/sections/${section.id}/do`}>Do <i className="fa fa-pencil"></i></Link>
            </div>
          </div>
        </div>
      </div>
    );
    return (

      <div id="wrapper">
        <SubMenuClient></SubMenuClient>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
          <HeaderClient></HeaderClient>
            <main>
              <div className="container">
                <div className="row">
                  <div id="trangchu" className="col-10 offset-1">
                    {this.isComponentMounted && <InfiniteScroll
                      dataLength={this.state.sections.length}
                      next={this.fetchMoreSections}
                      hasMore={this.state.hasMore}
                      loader={<h4>Loading...</h4>}
                      scrollThreshold={0.5}
                      height={500}
                    >{renderSections}
                    </InfiniteScroll>}

                  </div>
                </div>
               
              </div>
            </main>
            <Footer></Footer>
          </div>
        </div>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn, account } = state.auth;
  return {
    isLoggedIn: isLoggedIn,
    account: account
  };
}
export default connect(mapStateToProps)(HomePage);