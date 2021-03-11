import React from 'react'

const Home = () => {
    return (
        <div>
            <h1> Home Page add entry </h1>
            <form action = "/"
            method = "post" >
                <label>Post Title</label>
                <input type = "text" name = "title" />
                <label>Post Content</label>
                <input type = "text" name = "content" />
                <div>
                    <input type="checkbox" id="science" name="science" />
                    <label for="science">science</label>
                </div>
                <div>
                    <input type="checkbox" id="history" name="history" />
                    <label for="history">history</label>
                </div>
                <div>
                    <input type="checkbox" id="NSFW" name="NSFW" />
                    <label for="NSFW">NSFW</label>
                </div>
                <input type = "submit" value = "Submit" />
            </form>
        </div>
    )

}
export default Home