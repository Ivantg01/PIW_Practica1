import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    GET: (req: Request, ctx: FreshContext) => {
        return ctx.render( );
    },
};

const Page = () => {
    return (
        <div>
            <form method="get" action="/people">
                <p>Type a name of a Character: </p>
                <input type="text" name="name"  placeholder="Name..." />
                <button type="submit" >Enviar</button>
            </form>
        </div>
    );
};

export default Page;