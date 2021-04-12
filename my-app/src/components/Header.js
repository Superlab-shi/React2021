import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import React from 'react'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    // const onClick = () => {
    //     console.log('Click')
    // }
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{title} Task tracker</h1>
            {location.pathname === '/' && (<Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>)}
        </header>
    )
}

Header.defaultProps = {
    title: 'Default title Hello',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'greenyellow'
// }

export default Header
