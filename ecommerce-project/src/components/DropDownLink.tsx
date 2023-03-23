
import Link from "next/link"
import {forwardRef } from "react"

// passing a type of <Button>
export const DropDownLink = forwardRef<HTMLAnchorElement,React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    ({children, href, className, ...rest }, ref) => {

    return(
        <Link
            className={className} 
            {...rest} 
            ref = {ref} 
            href= {`${href}`}
        >
            {children} 
        </Link> 
    )
}) 