//action types

export const SET_DRAWER = 'SET_DRAWER'
export const ADD_RECIPE = 'ADD_RECIPE'
export const EDIT_RECIPE = 'EDIT_RECIPE'

//action creators

export function setDrawer(open){
	return {
		type: SET_DRAWER,
		open: open
	}
}

export function addRecipe(recipe){
	return {
		type: ADD_RECIPE,
		recipe: Object.assign({
			ingredients: []
		}, recipe)
	}
}

export function editRecipe(recipe){
	return {
		type: EDIT_RECIPE,
		recipe: Object.assign({
			ingredients: []
		}, recipe)
	}
}
