import { Component } from 'react';
import { getImages } from '../helpers/pixabay-api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { DivElem } from './App.styled';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    isModalShow: false,
    modalImg: null,
    isLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      try {
        const { totalHits, hits } = await getImages(query, page);
          this.setState(prevState => ({
            isLoadMore: totalHits > 0 && page < Math.ceil(totalHits / 12),
            images: [...prevState.images,...hits],
          }));
      } catch (error) {
        return alert('Oops, something went wrong');
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSearch = query => {
    this.setState({ query, page: 1,images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalOpen = modalImg => {
    this.setState({ isModalShow: true, modalImg });
  };

  handleModalClose = () => {
    this.setState({ isModalShow: false });
  };

  render() {
    const { images, isLoading, isModalShow, modalImg, isLoadMore,query } = this.state;
    return (
      <DivElem>
        <SearchBar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        {(images.length === 0 && query) && (
          <p>Sorry, we didn't found pictures for this query</p>
        )}
        <ImageGallery images={images} modalOpen={this.handleModalOpen} />
        {isLoadMore && <Button onLoadMore={this.loadMore} />}
        {isModalShow && (
          <Modal onModalClose={this.handleModalClose} image={modalImg} />
        )}
      </DivElem>
    );
  }
}