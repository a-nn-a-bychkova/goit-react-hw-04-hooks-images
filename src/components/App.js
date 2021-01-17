import React, { Component, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import Searchform from './Searchform';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState({ src: '', alt: '' });

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const handleImageClick = (src, alt) => {
    setLargeImage({ src, alt });
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  return (
    <div>
      <Searchbar>
        <Searchform onSubmit={handleFormSubmit} />
      </Searchbar>
      <ImageGallery searchQuery={searchQuery} onClick={handleImageClick} />
      {showModal && (
        <Modal
          src={largeImage.src}
          alt={largeImage.alt}
          onClose={toggleModal}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;

// class App extends Component {
//   state = {
//     searchQuery: '',
//     showModal: false,
//     largeImage: { src: '', alt: '' },
//   };

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   handleImageClick = (src, alt) => {
//     this.setState({ largeImage: { src, alt } });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     const { searchQuery, largeImage, showModal } = this.state;
//     return (
//       <div>
//         <Searchbar>
//           <Searchform onSubmit={this.handleFormSubmit} />
//         </Searchbar>
//         <ImageGallery
//           searchQuery={searchQuery}
//           onClick={this.handleImageClick}
//         />
//         {showModal && (
//           <Modal
//             src={largeImage.src}
//             alt={largeImage.alt}
//             onClose={this.toggleModal}
//           />
//         )}
//         <ToastContainer />
//       </div>
//     );
//   }
// }

// export default App;
