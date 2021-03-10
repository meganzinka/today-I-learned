import React from 'react'

const Home = () => {
    return (
        <div>
            <h1> Home Page add entry </h1>
            <form action = "/"
            method = "post" >
                <label> Title <textarea /> </label> 
                <label> TIL < textarea /> </label> 
                <div>
                    <input type="checkbox" id="science" name="science" />
                    <label for="science">science</label>
                </div>
                <div>
                    <input type="checkbox" id="history" name="history" />
                    <label for="history">history</label>
                </div>
            </form>
        </div>
    )

}
export default Home