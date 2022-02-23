import { GetStaticProps, GetStaticPropsResult } from "next/types";
import { FunctionComponent } from "react";
import { Card, Grid, Box } from "@material-ui/core";
import { callMarvel } from "../../utils";
import router from "next/router";
import Image from 'next/image';
import { MARVEL_PATHS } from "../../contants";
import { CharacterDTO, MarvelResponse } from "../../models-marvel";
import { SimpleDataSetResponse } from "../../models";


export const getStaticPaths = async () => {
    const firstCall: MarvelResponse = await callMarvel<MarvelResponse>(MARVEL_PATHS.MARVER_CHARACTERS_PATH, new Map());
    const pages = Math.floor(firstCall.data.total / firstCall.data.limit);
    const paths = Array.from(Array(pages).keys()).map(id => ({ params: { page_id: id.toString() } }));

    return {
        paths: paths,
        fallback: true
    }

}

export const getStaticProps: GetStaticProps = async (context: any) => {
    const limit: number = 27;
    const offset: number = limit * context.params.page_id;
    const marvelReponse: MarvelResponse = await callMarvel<MarvelResponse>(MARVEL_PATHS.MARVER_CHARACTERS_PATH, new Map(), new Map([['offset', offset.toString()], ['limit', limit.toString()]]));

    const characters: CharacterDTO[] = marvelReponse.data.results.map((character: any) =>
    ({
        'name': character.name, 'id': character.id, 'thumbnail': character.thumbnail.path + "." + character.thumbnail.extension,
        'description': character.description
    }));

    const resp: GetStaticPropsResult<SimpleDataSetResponse<CharacterDTO>> = { props: { items: characters, pageNumber: context.params.page_id, count: marvelReponse.data.total, error: false, errorCode: 200 } };
    return resp;
}


const Characters: FunctionComponent<SimpleDataSetResponse<CharacterDTO>> = (props) => {

    const currentPage: number = parseInt((props.pageNumber || "0"));

    const chararacterCards = props.items?.map(char =>
        <Grid item key={char.id}>
            <Card >
                <Box onClick={() => router.push('../character/' + currentPage + "-" + char.id)} className="character" >
                    <Box className="card_description">{char.name}</Box>
                    <Image src={char.thumbnail} objectPosition='relative' layout='fill' />
                </Box>
            </Card>
        </Grid>
    );

    return (
        <Box>
            <Grid container className="character-container">  {chararacterCards} </Grid>

            <Box className="bottom-nav">
                {currentPage > 0 && <Box onClick={() => { router.push("" + (currentPage - 1)) }}>Previous Page</Box>}
                <Box onClick={() => { router.push("" + (currentPage + 1)) }} >Next Page</Box>
            </Box>
        </Box>

    );
}

export default Characters;