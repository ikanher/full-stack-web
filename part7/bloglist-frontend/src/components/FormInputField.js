import React from 'react'

const FormInputField = ({ name, field }) => {
    /* eslint-disable no-unused-vars */
    const { reset, ...input } = field
    /* eslint-enable no-unused-vars */

    return (
        <div>
            { name }
            <input {...input} />
        </div>
    )
}

export default FormInputField
