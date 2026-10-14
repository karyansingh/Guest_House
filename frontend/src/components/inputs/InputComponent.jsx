import React, { useEffect, useRef, useState } from 'react'
import { useId, useMemo } from 'react'
import { Field, ErrorMessage, useFormikContext } from "formik"
import Loading from '../../loaders/Loading'

export const Input = React.forwardRef(function Input({
    label,
    type = "text",
    name,
    placeholder,
    className,
    icon,
    ...props
}, ref) {
    const id = useId()
    return (
        <div>
            <div style={{marginBottom:'10px'}}>
                {label && <label htmlFor={id} className="lbl"> {label} </label>}
            </div>
            <div className="input-group">
                <span className="input-icon">
                    {icon}
                </span>
                <Field
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={`${className} input`}
                    id={id}
                    ref={ref}
                    {...props}
                />
            </div>
        </div>
    )
})

export const Butn = React.forwardRef(function Butn({
    children,
    type = "submit",
    className,
    onClick,
    isLoading,
    ...props
}, ref) {
    if (isLoading) {
        return <Loading />
    } else {
        return (
            <div>
                <button
                    className={`${className} login-button`}
                    type={type}
                    onClick={onClick}
                    ref={ref}
                >
                    {children}
                </button>
            </div>
        )
    }
})

export const IsErrorMessage = React.forwardRef(function IsErrorMessage({
    name,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div style={{ margin: '10px' }}>
            <div>
                <ErrorMessage
                    name={name}
                    component="div"
                    className="error"
                    id={id}
                    ref={ref}
                    {...props}
                />
            </div>
        </div>
    )
})