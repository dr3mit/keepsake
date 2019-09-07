import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addSelectedImage,
  removeSelectedImage,
  getSingleImage,
  flipSelect,
  deleteAllSelectedImages,
} from '../redux/images';
import Tag from './Tag.jsx';
import SingleImage from './SingleImage.jsx';

const Home = props => {
  const {
    images,
    select,
    swapSelect,
    selectImage,
    deselectImage,
    addToSingleImage,
    currentImages,
    deleteSelectedImages,
  } = props;

  // select button to changes between single image veiw and select images
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div>
        <div> Welcome! </div>
        <Link to="/scrapbook" />
        <Link to="/upload" />,
      </div>

      <h1
        onClick={event => {
          event.preventDefault();
          swapSelect();
        }}
      >
        SELECT
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {images.map(image => {
          return (
            <div key={image.id}>
              <img
                src={image.imageUrl}
                alt=""
                onClick={event => {
                  event.preventDefault();
                  if (select) {
                    if (
                      currentImages.filter(
                        currentImage => currentImage.id === image.id
                      ).length > 0
                    ) {
                      deselectImage(image);
                    } else {
                      selectImage(image);
                      //add jsx to show image is selected
                    }
                  } else {
                    addToSingleImage(image);

                    //fix this
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      <Link to="/upload">
        <div className="btn orange darken-2">Upload</div>
      </Link>
      <Tag />
      <div>
        {/* <button onClick={deleteSelectedImages(currentImages)}>
          DELETE SELECTED IMAGES
        </button> */}
      </div>
    </div>
  );
};

Home.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      dateTaken: PropTypes.number,
      fileName: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ).isRequired,
};

const mapStateToProps = state => {
  return {
    images: state.images.allImages,
    currentImages: state.images.selectedImages,
    select: state.images.select,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectImage: image => {
      dispatch(addSelectedImage(image));
    },
    deselectImage: image => {
      dispatch(removeSelectedImage(image));
    },
    addToSingleImage: image => {
      dispatch(getSingleImage(image));
    },
    swapSelect: () => {
      dispatch(flipSelect());
    },
    deleteSelectedImages: images => {
      dispatch(deleteAllSelectedImages(images));
    },
    goToSingleImage: () => {
      return <Link to="/SingleImage" component={SingleImage} />;
    },
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
