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

    // base64 and state
    reader.onloadend = () => {
      this.setState({imagePreview: reader.result, filename: file.name});
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className=''>
          <div className=''>
            <div className=''>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor='image' className=''>Character Portrait</label>
                <input onChange={this.handleFilenameChange} className='' id='image' placeholder='Filename' value={this.state.filename}/>
                <label htmlFor='file'>Choose an Image</label>
                <input className='' type='file' id='file' onChange={this.handleImagePreview} />
                <button type='submit' className='' onClick={this.handleSubmit}>Upload Image</button>
              </form>
            </div>

            <div className='image-preview-area col-md-3'>
              {this.state.imagePreview ? <img src={this.state.imagePreview} className='' alt='Character Portrait'/> : null}
            </div>

          </div>
      </div>
    )
  }
}

export default ImageUpload;
