import Notiflix from 'notiflix';
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
    currentImage: null,
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
      const response = await fetchApi(name, page);
      console.log(response)
      if (!response.data.hits.length) {
        Notiflix.Notify.failure('No images found!');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        total: response.data.total,
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
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollTo();
    };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { state: {
      isLoading,
      name,
      images,
      total,
      page,
      perPage,
      currentImage },
      handleImageSubmit,
      openModal,
      handleLoadMore,
      closeModal } = this;
    return (
      <>
        <SearchBar onSubmit={handleImageSubmit} />

        {isLoading && <Loader />}

        {name && (<ImageGallery images={images} openModal={openModal} />)}
        
        {Math.ceil(total / page) > perPage &&
          <Button onLoadMore={handleLoadMore} />}
        
        {currentImage &&
          <Modal src={currentImage} closeModal={closeModal} />}           
      </>
    )
  }
} 

