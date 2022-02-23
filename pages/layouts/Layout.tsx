import { Box } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import Header from "./Header";

const PageLayout: FunctionComponent = (props) => {


    return (
        <Box>
            <Header />
            {props.children}
        </Box>
    )

}

export default PageLayout;