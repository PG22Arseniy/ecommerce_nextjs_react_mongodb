import { Layout } from "@/components/Layout";
import React, { useRef } from "react";

const Collection = () => {

    const imageListRef = useRef<HTMLUListElement>(null)

    const ChangeImage = (next:Boolean) => {
        const slides  = imageListRef.current

        let newIndex:number = 0;
        const CollectionLength = slides?.children.length!

        // find  new index
        for (let i = 0; i < CollectionLength; i++) {
           if (slides?.children[i].classList.contains("active")){
                slides?.children[i].classList.remove("active")

                if (next) newIndex = i+1;
                else newIndex = i-1;
           }
        }  

        // adjust index for rotation
        if (newIndex < 0) newIndex = CollectionLength - 1;
        if (newIndex >= CollectionLength) newIndex = 0;

        slides?.children[newIndex].classList.add("active")

    }

    return (
        <Layout>
        <div className="collection">
            <h1> BEST PRICES </h1> 
            <section area-label = "Best Price Products">
                <div className="carousel">
                    <button className="prev" onClick={()=> ChangeImage(false)} value="prev"> &#8656; </button>
                    <button className="next" onClick={()=> ChangeImage(true)} value="next"> &#8658; </button> 
                    <ul ref={imageListRef}>
                        <li className="slide" > 
                            <img src = "/images/shirt1.jpg" alt = "shirt1"/>
                        </li>
                        <li className="slide active"> 
                            <img src = "/images/shirt2.jpg" alt = "shirt2"/>
                        </li> 
                        <li className="slide">
                            <img src = "/images/shirt3.jpg" alt = "shirt3"/>
                        </li> 
                        <li className="slide">
                            <img src = "/images/shirt4.jpg" alt = "shirt4"/>
                        </li>  
                    </ul>
                </div>
            </section>
        </div>
        </Layout>
    )
}

export default Collection;