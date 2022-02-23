import React, { FunctionComponent } from "react";
import Header from "./Header";

const PageLayout: FunctionComponent = (props) => {
    console.log(props);

    return <div>  
        <Header/>
        {props.children} 
        
        </div>
}

export default PageLayout;