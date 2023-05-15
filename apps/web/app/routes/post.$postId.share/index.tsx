import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { sdk } from "../../graphql/graphqlWrapper.server";
import { isPrivateRoute } from "../../utils/utils.server";
export async function loader({ request, params }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const postId = params.postId;

  if (!postId) return redirect("/");

  const post = await sdk.GetPost(
    {
      postId,
    },
    { request }
  );
  if (post.getPost) {
    return redirect(`/p/${post.getPost?.postHandle}/share`);
  }
  return redirect("/");
}
