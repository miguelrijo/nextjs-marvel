import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { MARVEL_PATHS } from "../../contants";
import { callMarvel } from "../../utils";
import { Box, Button } from "@material-ui/core";
import router from "next/router";
import { CharacterDTO, MarvelResponse } from "../../models-marvel";
import { SimpleDataEntityResponse } from "../../models";
import Image from 'next/image';


export const getServerSideProps: GetServerSideProps = async (context: any) => {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=30, stale-while-revalidate=59'
      )

    let pageNumber, characterId;
    [pageNumber, characterId] = context.params.id.split("-");

    const characterResponse: MarvelResponse = await callMarvel<MarvelResponse>(MARVEL_PATHS.MARVER_CHARACTER_PATH, new Map([["character_id", characterId]]));
    const characterData = characterResponse.data.results[0];
    const simpleReponse: SimpleDataEntityResponse<CharacterDTO> = {
        entity: {
            name: characterData.name,
            id: characterData.id,
            description: characterData.description,
            thumbnail: characterData.thumbnail.path + "." + characterData.thumbnail.extension
        },
        pageNumber,
        error: false,
        errorCode: 200
    };
    return { props: simpleReponse };

}


const CharacterDetails: FunctionComponent<SimpleDataEntityResponse<CharacterDTO>> = (props: SimpleDataEntityResponse<CharacterDTO>) => {
    const character: CharacterDTO = props.entity;
    const descriptionNotFound: string = "This character is so mysterious that it doesn't have any description available.";
    return (
        <Box className="character-details-container">
            <Box className="character-details" style={{ backgroundImage: `url(${character.thumbnail})`, position:'relative' }}> 
            <Image src={character.thumbnail} objectPosition='relative' layout='fill' />
             <Box className="card_description">{character.name}</Box></Box>
            <Box className="character-description"> <Box>{character.description ? character.description : descriptionNotFound} </Box> <Box id="back-button"><Button onClick={() => router.push('../characters/' + props.pageNumber)} variant="text">Go back</Button></Box></Box>
        </Box>

    );
}


export default CharacterDetails;