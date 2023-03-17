export const Highlight = (elem:HTMLElement, color: string = "red", timeInSec: number = 2) => {

    elem.style.backgroundColor = color 

    setTimeout(()=>{
        elem.style.backgroundColor = "white" 
    }, timeInSec*1000) 

}