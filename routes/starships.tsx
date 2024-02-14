import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import re from "https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs";

type Data = {
    ships: Starships[];
    page?: string;
    next?: string;
    previous?: string;
};
type Starships = {
    name:string,
    model:string,
    manufacturer:string,
    cost_in_credits:string,
}

export const handler: Handlers<Data> = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        try {
            const url = new URL(req.url);
            const numPage = url.searchParams.get("page") || undefined;
            const starShipsInPage: Starships[]= await Axios
                .get<Starships[]>("https://swapi.dev/api/starships/?page="+numPage);
            const data: Data = {
                ships: starShipsInPage.data.results,
                page: numPage,
                next: starShipsInPage.data.next,
                previous: starShipsInPage.data.previous
            };
            return ctx.render(data);

        } catch (error) {
            throw new Error("Starships not found");
        }
    },
};

const Page = (props: PageProps<Data>) => {
    const currentPage = parseInt(props.data.page);
    return (
          <div>
            <h1>Starships</h1>
            <ul>
                {props.data.ships.map((Starship) => (
                    <li>
                        <h2>{Starship.name}</h2>
                        <p>Model: {Starship.model}</p>
                        <p>Manufacturer: {Starship.manufacturer}</p>
                        <p>Cost in credits: {Starship.cost_in_credits}</p>
                    </li>
                ))}
            </ul>

              {props.data.previous && <a href={"/starships?page=" + (currentPage - 1)}><button>Previous</button><br></br> </a>}
              {props.data.next && <a href={"/starships?page=" + (currentPage + 1)}><button>Next</button><br></br></a>}

              <form method="get" action="/starships">
                  Go to page: <input type="number" name="page" value={currentPage}/>
                  <button type="submit" >Go</button>
              </form>

        </div>
    );
};

export default Page;