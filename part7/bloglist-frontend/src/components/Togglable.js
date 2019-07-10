import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'

import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility} color='green' size='tiny'>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility} color='red' size='tiny'>
                    Cancel
                </Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable
