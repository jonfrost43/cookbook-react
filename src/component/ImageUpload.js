import React, { Component, createRef } from 'react';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import IconButton from 'material-ui/IconButton';
import FullScreenIcon from 'material-ui/svg-icons/navigation/fullscreen';
import FullScreenExitIcon from 'material-ui/svg-icons/navigation/fullscreen-exit';
import LinearProgress from 'material-ui/LinearProgress';
import { deepOrangeA200 } from 'material-ui/styles/colors';
import './imageUpload.css';


class ImageUpload extends Component {
	constructor(props){
		super();

		this.imageRef = createRef();

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
					height: this.imageRef.current.clientHeight+'px'
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
					<LinearProgress mode="indeterminate" color={deepOrangeA200} style={{
						backgroundColor:'none',
						borderRadius:0,
						position:'absolute',
						top:0}}
					/>
					<img src={this.state.previewUrl} ref={this.imageRef} />
				</div>
			</div>
		)
	}
}

export default ImageUpload;
