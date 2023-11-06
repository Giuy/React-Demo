import React from 'react';
import PropTypes from 'prop-types';

type ITemplate = {
    childLeft?: React.ReactNode;
    childRight?: React.ReactNode;
}

function ChildTemplate(props: ITemplate) {
    return (
        <div className='template-container'>
            <div className='itemLeft'>{props.childLeft}</div>
            <div className='itemRight'>{props.childRight}</div>
        </div>
    );
}

export default ChildTemplate;