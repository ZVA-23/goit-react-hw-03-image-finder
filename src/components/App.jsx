import { Component } from 'react';
import { fetchApi } from 'utils/fetchApi';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    name: '',
    page: 1,
    images: [],
    perPage: 12,
    isLoading: false,
    error: null,
    totalHits: null,
    currentImage: null,
    loadMore: false,
  }

  componentDidUpdate(_, prevState) {
    const { name, page, perPage } = this.state;
    if (name !== prevState.name || page !== prevState.page) {
      this.fetchImages(name, page, perPage);
    }
    if (page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = async (name, page) => {
    this.setState({ isLoading: true });
    if (!name) {
      return;
    }
    try {
      // const { hits, totalHits } = await fetchApi(name, page);
      const respons = await fetchApi(name, page);
      console.log(respons);
      // console.log(hits, totalHits);
      this.setState(prevState => ({
        images: [...prevState.images, ...respons.data.hits],
        loadMore: this.state.page < Math.ceil(this.state.totalHits / this.state.perPage),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleImageSubmit = name => {
    this.setState({
      name,
      page: 1,
      images: [],
      loadMore: false,
    });
  };
    handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollTo();
    };
    // openModal = largeImageURL => {
  //   console.log(largeImageURL);
  //   this.setState({
  //     showModal: true,
  //     largeImageURL: largeImageURL,
  //   });
  // };
  closeModal = () => {
    this.setState({ currentImage: null });
  };
    render() {
    return (
      <>
        <SearchBar onSubmit={this.handleImageSubmit} />
        {this.state.isLoading ? (
          <Loader />) : (
          <ImageGallery images={this.state.images} openModal={this.openModal} />)}
        {this.state.loadMore &&
          <Button page={this.state.page} onLoadMore={this.handleLoadMore} />}
        {this.state.currentImage &&
          <Modal src={this.state.currentImage} closeModal={this.closeModal} />}       
      </>
    )
  }
} 

