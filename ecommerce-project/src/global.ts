export const Highlight = (elem:HTMLElement, color: string = "red" , timeInSec: number = 2, initialColor: string = "white") => {

    elem.style.backgroundColor = color 

    setTimeout(()=>{
        elem.style.backgroundColor = initialColor 
    }, timeInSec*1000) 

}