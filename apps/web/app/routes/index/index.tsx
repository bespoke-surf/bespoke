import type {
  ActionFunction,
  HeadersFunction,
  LoaderFunction,
} from "@remix-run/node";
import { Response, json, redirect } from "@remix-run/node";
import { useNavigation, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { useCallback } from "react";
import { sdk } from "~/graphql/graphqlWrapper.server";
import type { RootData } from "~/root";
import {
  getSubdomain,
  isPrivateRoute,
  isRouteOnUserSubdomain,
  redirectToSubdomain,
} from "~/utils/utils.server";
import { validateForm } from "~/utils/validateForm.server";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import NewLandingPage from "./LandingPage";
import Posts from "./Posts";
import type { IndexData } from "./types";
import { CreateNewPostSchema, IndexActionEnum, POST_TAKE } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "cache-control": loaderHeaders.get("cache-control") ?? "no-store",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const isOnSubdomain = isRouteOnUserSubdomain(request);
    if (isOnSubdomain) {
      const subdomain = getSubdomain(request);
      if (typeof subdomain !== "string") return null;

      const skipExist = new URL(request.url).searchParams.get("skip");
      const skip = skipExist ? Number(skipExist) : 0;

      const isPrivate = await isPrivateRoute(request, true);

      // const skip = parsedUrl.query.skip ? Number(parsedUrl.query.skip) : 0;

      const response = await Promise.all([
        sdk.GetPosts({ take: POST_TAKE, skip, subdomain }, { request }),
        // sdk.GetDraftPosts({ subdomain }, { request }),
      ]);

      const posts = response[0];
      return json<IndexData>(
        {
          posts: posts.getPosts,
        },
        {
          headers: {
            "cache-control": isPrivate
              ? "private, max-age=5"
              : "public, s-maxage=60, stale-while-revalidate=2678400",
          },
        }
      );
    } else {
      const response = await Promise.all([
        sdk.CheckUserOrboarded({}, { request }),
        sdk.GetUserStore({}, { request }),
      ]);
      const onboarded = response[0];
      const store = response[1];
      if (onboarded?.checkUserOnboarded === false) {
        return redirect("/onboarding");
      } else if (
        onboarded?.checkUserOnboarded === true &&
        store.getUserStore?.subdomain
      ) {
        return redirectToSubdomain(
          request,
          store.getUserStore?.subdomain,
          "/dashboard"
        );
      } else {
        return null;
      }
    }
    // const cookieHeader = request.headers.get("Cookie");
    // const popupCookie: ISubdomainPopupCookie =
    //   (await subdomainPopupCookie.parse(cookieHeader)) || {};

    // let showReader = true;

    // const today = dayjs();
    // const lastPopup = dayjs(popupCookie.lastPoupData);
    // const dayDifference = today.diff(lastPopup, "days");

    // if (dayDifference <= 45 && popupCookie.lastPoupData !== undefined) {
    //   showReader = false;
    // }
  } catch (err) {
    if (err instanceof Response) throw err;
    return { errors: err };
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const action = formData.get("_action");

    if (action === IndexActionEnum.updateDisplayPicture) {
      const storeId = formData.get("storeId") as string;
      const imageData = formData.get("imageData") as string;
      const parsedData = JSON.parse(imageData) as {
        height: number;
        width: number;
        url: string;
      }[];
      const height = parsedData[0]?.height;
      const width = parsedData[0]?.width;
      const url = parsedData[0]?.url;

      if (!height || !width || !url) return null;

      await sdk.UpdateDisplayPicture(
        {
          input: {
            storeId,
            height,
            width,
            url,
          },
        },
        { request, forbiddenRedirect: "/" }
      );
    }

    if (action === IndexActionEnum.createPost) {
      await validateForm(CreateNewPostSchema, formData);
      const storeId = formData.get("storeId") as string;
      const post = await sdk.CreatePost(
        {
          input: {
            storeId,
            title: "",
          },
        },
        {
          request,
          forbiddenRedirect: "/",
        }
      );
      return redirect(`/post/${post.createPost?.id}`);
    }
    if (action === IndexActionEnum.updateSubdomainPopup) {
      // const cookieHeader = request.headers.get("Cookie");
      // const popupCookie: ISubdomainPopupCookie =
      //   (await subdomainPopupCookie.parse(cookieHeader)) || {};
      // popupCookie.lastPoupData = String(new Date());
      // const url = new URL(request.url);
      // const hostname = url.hostname;
      // return new Response("", {
      // headers: {
      //   "Set-Cookie": await subdomainPopupCookie.serialize(popupCookie, {
      //     domain: hostname,
      //   }),
      // },
      // });
    }

    return null;
  } catch (err) {
    console.log(err);
    if (err instanceof Response) throw err;
    return { errors: err };
  }
};

export default function App() {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const submit = useSubmit();

  const navigation = useNavigation();
  const loading =
    navigation.state === "loading" || navigation.state === "submitting";

  const handleOpenReader = useCallback(() => {
    if (loading) return;
    if (!rootLoaderData?.store?.id) return;
    const formData = new FormData();
    formData.append("_action", IndexActionEnum.createPost);
    formData.append("storeId", rootLoaderData.store?.id);
    submit(formData, { method: "post" });
  }, [loading, rootLoaderData.store?.id, submit]);

  if (rootLoaderData?.subdomain === undefined) return <NewLandingPage />;

  return <Posts createPost={handleOpenReader} />;
}
