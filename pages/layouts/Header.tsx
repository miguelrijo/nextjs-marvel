import { FunctionComponent } from "react";
import Image from 'next/image'
import marvelImage from '../../public/marvel.png';

const Header: FunctionComponent = () => {
    return <div id="header"> <Image src={marvelImage} width="400px" height="120px"/>  </div>
}

export default Header; 