import React, {Component} from 'react';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: '',
      imageFile: null,
      imagePreview: ''
    };
  }

  handleFilenameChange = (e) => {
    e.preventDefault();
    this.setState({filename: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let imageFile = this.state.imageFile;

    this.props.handleImage(imageFile)
    this.setState({filename: this.state.filename, imageFile: null, imagePreview: ''});
  }

  handleImagePreview = (e) => {
    e.preventDefault();

    // Process file
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({imageFile: file});
    console.log('File ', file);

    // base64 and state
    reader.onloadend = () => {
      this.setState({imagePreview: reader.result, filename: file.name});
    }
    reader.readAsDataURL(file)
  }

  componentDidUpdate() {
    // run masonry layout after the component updates
    setTimeout(() => {
      this.props.msnry.layout();
    }, 100);
  }

  render() {
    return (<div className='image-upload-container grid-item'>
      <div className='row'>
        <h1 className='card-title'>Portrait:</h1>
        <div className='six columns image-form-area'>
          <form onSubmit={this.handleSubmit} encType='mutlipart/form-data'>
            <label htmlFor='image' className=''>Character Portrait</label>
            <input onChange={this.handleFilenameChange} className='' id='image' placeholder='Filename' value={this.state.filename}/>
            <label htmlFor='file'>Choose an Image</label>
            <input className='' type='file' id='file' onChange={this.handleImagePreview}/>

            <div className='row'>
              <button type='submit' className='' onClick={this.handleSubmit}>Upload Image</button>
            </div>

          </form>
        </div>

        <div className='image-preview-area five columns'>
          {
            this.state.imagePreview
              ? <img src={this.state.imagePreview} className='character-image' alt='Character Portrait'/>
              : null
          }
          {
            this.props.uploadedImage
              ? <img src={this.props.uploadedImage} className='character-image' alt='Character Portrait'/>
              : null
          }
        </div>
      </div>
    </div>)
  }
}

export default ImageUpload;
