import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"


type Character = {
    name?:string,
    height?:string,
    mass?:string,
    gender?:string,
    birth_year?:string
}

export const handler: Handlers<Character> = {
    GET: async (req: Request, ctx: FreshContext<Character>) => {
        const url = new URL(req.url);
        const name = url.searchParams.get("name") || undefined;
        const character: Character= await Axios
            .get<Character>("https://swapi.dev/api/people/?search="+name);
        if(character.data.count===0){
            throw new Error("Character not found");
        }
        return ctx.render(character.data.results[0]);
    },
};

const Page = (props: PageProps<Character>) => {
    const name = props.data.name || undefined;
    const height= props.data.height;
    const mass= props.data.mass;
    const gender= props.data.gender;
    const birth_year= props.data.birth_year;

    return (
        <div>
            <h1>Name: {name}<br></br></h1>
            <p>Height: {height}<br></br></p>
            <p>Mass: {mass}<br></br></p>
            <p>gender: {gender}<br></br></p>
            <p>Birth Year: {birth_year}<br></br></p>
        </div>
    );
};

export default Page;