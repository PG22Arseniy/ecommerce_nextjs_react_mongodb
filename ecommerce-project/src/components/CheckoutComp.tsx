import React from "react";


type CheckoutProps = {
    activeStep: number
}

export const CheckoutComp = (props: CheckoutProps) => {

    return (
        <div className="checkoutComp">
            {['Login', 'Address', 'Payment', 'Order'].map (
                (step, index) => (
                    <div
                    key={step}
                    className={`checkoutStep 
                        ${
                            index <= props.activeStep
                            ? 'enabled'
                            : 'disabled'
                        }
                    `}
                    > 
                    {step} 
                    </div>
                )
            )}
        </div>
    )
}