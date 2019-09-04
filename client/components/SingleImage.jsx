import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from './Tag.jsx';
import { addSelectedImage, removeSelectedImage } from '../redux/images';
import Home from './Home.jsx';

const SingleImage = props => {
  const { image, selectedImages } = props;
  return (
    <div>
      <div>
        <img
          src={image.imageUrl}
          onClick={event => {
            event.preventDefault();
            if (image in selectedImages) {
              props.deselectImage(image);
            } else {
              props.selectImage(image);
            }
          }}
        />
      </div>
      <Tag />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    back: () => <Redirect to="/" component={Home} />,
    selectImage: image => dispatch(addSelectedImage(image)),
    deselectImage: image => dispatch(removeSelectedImage(image)),
  };
};

const mapStateToProps = state => {
  return {
    image: state.images.singleImage,
    selectedImages: state.images.selectedImages,
  };
};

SingleImage.propTypes = {
  image: PropTypes.shape({
    imageUrl: PropTypes.string,
    dateTaken: PropTypes.number,
    fileName: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleImage);
