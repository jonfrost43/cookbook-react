import React from 'react'

export default function(props){
	let titleParts = ['Cookbook in React']

	if(props.title){
		titleParts.unshift(props.title)
	}
	document.title = titleParts.join(' | ')
	return null
}
