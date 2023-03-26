import { useRouter } from "next/router";
import React from "react";


type CheckoutProps = {
    activeStep: number
}

export const CheckoutComp = (props: CheckoutProps) => {

    const router = useRouter()

    const PreviousStep = ()=> {
        switch (props.activeStep) {
            case 2:
                router.push('/shipping')
                break;
            case 3:
                router.push('/payment')  
                break;     
            default:
                break;
        }
    }

    return (
        <div className="checkoutHeader">
            <div>
                <button 
                    onClick={PreviousStep}
                    className={` 
                        ${
                            1 < props.activeStep
                            ? 'enabledBtn'
                            : '' 
                        }               
                    `}
 
                    disabled = {1 >= props.activeStep} 
                    > 
                    &#8656; 
                </button>
            </div>
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
                            ${
                                index == props.activeStep
                                ? 'currentStep'
                                :''
                            }
                            
                        `}
                        > 
                        {step} 
                        </div>
                    )
                )}
            </div>
        </div>
    )
}