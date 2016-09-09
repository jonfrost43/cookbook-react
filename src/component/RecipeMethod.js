import React from 'react';

export default React.createClass({
	render: function(){
		return (
			<fieldset className="method">
                <legend>Method</legend>
                <div>
                    <textarea name="methodStep1"></textarea>
                </div>
                <button type="button">Add step</button>
            </fieldset>
		);
	}
});
