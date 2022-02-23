import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { MARVEL_PATHS } from "../../contants";
import { callMarvel } from "../../utils";
import { Button } from "@material-ui/core";
import router from "next/router";
import { CharacterDTO, MarvelResponse } from "../../models-marvel";
import { SimpleDataEntityResponse } from "../../models";


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
    const descriptionNotFound: string = " This character is so mysterious that it doesn't have any description available.";
    return (
        <div className="character-details-container">
            <div className="character-details" style={{ backgroundImage: `url(${character.thumbnail})` }}>  <div className="card_description">{character.name}</div></div>
            <div className="character-description"> <div>{character.description ? character.description : descriptionNotFound} </div> <div id="back-button"><Button onClick={() => router.push('../characters/' + props.pageNumber)} variant="text">Go back</Button></div></div>
        </div>

    );
}


export default CharacterDetails;