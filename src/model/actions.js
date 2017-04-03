//action types

export const SET_DRAWER = 'SET_DRAWER'
export const ADD_RECIPE = 'ADD_RECIPE'
export const EDIT_RECIPE = 'EDIT_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const CLEAR_RECIPES = 'CLEAR_RECIPES'

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

export function deleteRecipe(recipeId){
	return {
		type: DELETE_RECIPE,
		recipeId: recipeId
	}
}

export function clearRecipes(){
	return {
		type: CLEAR_RECIPES
	}
}
