import React, { Component } from 'react';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import IconButton from 'material-ui/IconButton';
import FullScreenIcon from 'material-ui/svg-icons/navigation/fullscreen';
import FullScreenExitIcon from 'material-ui/svg-icons/navigation/fullscreen-exit';
import './imageUpload.css';


class ImageUpload extends Component {
	constructor(props){
		super();

		this.state = {
			previewUrl: null,
			isPreviewExpanded: false,
			wrapperClass: ''
		};
	}

	handleChange = e => {
		this.setState({
			previewUrl: window.URL.createObjectURL(e.target.files[0]),
			wrapperClass: 'hasPreview'
		});
	}

	handleClickFullScreen = e => {
		if(this.state.isPreviewExpanded){
			this.setState({
				isPreviewExpanded: false,
				styles: {}
			});
		}
		else {
			this.setState({
				isPreviewExpanded: true,
				styles: {
					height: '308px'
				}
			});
		}
	}

	render(){
		return (
			<div className={'imageUpload '+this.state.wrapperClass}>
				<div className="uploadInput">
					<label htmlFor={this.props.id}>
						<span>Upload image</span>
						<AddPhotoIcon />
					</label>
					<input id={this.props.id} onChange={this.handleChange} type="file" accept="image/*" />
				</div>

				<div className="imagePreview" style={this.state.styles}>
					<div className="imageControls">
						<IconButton onClick={this.handleClickFullScreen}><FullScreenIcon /></IconButton>
					</div>
					<img src={this.state.previewUrl} />
				</div>
			</div>
		)
	}
}

export default ImageUpload;
