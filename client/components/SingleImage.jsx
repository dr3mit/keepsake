import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from './Tag.jsx';
import {
  addSelectedImage,
  removeSelectedImage,
  deleteImageFromDB,
} from '../redux/images';
import Home from './Home.jsx';


class SingleImage extends React.Component {
  componentDidMount() {
    this.props.getImageTags(this.props.image);
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="single-image-container">
        <div className="row">
          <div className="col s12 xl3">
            <div className="card">
              <div className="card-image">
                <img src={this.props.image.imageUrl} />
                <span className="card-title">{this.props.image.fileName}</span>
              </div>
              <div className="card-content">
                <p>
                  {'Tags:  '}
                  {this.props.imageTags.map((tag, idx) => {
                    if (idx !== this.props.imageTags.length - 1)
                      return (
                        ` ${tag.slice(0, 1).toUpperCase()}` +
                        `${tag.slice(1)}, `
                      );
                    return (
                      ` ${tag.slice(0, 1).toUpperCase()}` + `${tag.slice(1)}`
                    );
                  })}
                </p>
              </div>

              <div className="card-action">
                <button
                  type="button"
                  onClick={event => {
                    event.preventDefault();
                    this.props.deleteImage(this.props.image);
                    return <Redirect to="/scrapbook" />;
                  }}
                >
                  DELETE IMAGE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="single-image-tags">
          <Tag />
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    back: () => <Link to="/" component={Home} />,
    deleteImage: image => {
      dispatch(deleteImageFromDB(image));
    },
    // selectImage: image => dispatch(addSelectedImage(image)),
    // deselectImage: image => dispatch(removeSelectedImage(image)),
  };
};

const mapStateToProps = state => {
  return {
    image: state.images.singleImage,
    authenticated: state.currentUser.authenticated,
    // selectedImages: state.images.selectedImages,
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
