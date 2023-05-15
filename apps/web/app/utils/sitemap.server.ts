import type { EntryContext } from "@remix-run/node";
import dayjs from "dayjs";
import isEqual from "lodash/isEqual";
import { sdk } from "../graphql/graphqlWrapper.server";

const allowedRoutes = [
  "routes/index/index",
  "routes/pricing/index",
  "routes/login",
  "routes/signup",
  // "routes/_auth/pricing/index",
  // "routes/_auth/login/index",
  // "routes/_auth/signup/index",
];

function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  return {
    protocol,
    host,
  };
}

type KCDSitemapEntry = {
  route: string;
  lastmod?: string;
  changefreq?:
    | string
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
};

type KCDHandle = {
  /** this just allows us to identify routes more directly rather than relying on pathnames */
  id?: string;
  /** this is here to allow us to disable scroll restoration until Remix gives us better control */
  restoreScroll?: false;
  getSitemapEntries?: (
    request: Request
  ) =>
    | Promise<Array<KCDSitemapEntry | null> | null>
    | Array<KCDSitemapEntry | null>
    | null;
};

function removeTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

function typedBoolean<T>(
  value: T
): value is Exclude<T, "" | 0 | false | null | undefined> {
  return Boolean(value);
}

async function getSitemapXml(request: Request, remixContext: EntryContext) {
  const domainUrl = getDomainUrl(request);

  function getEntry({ route, lastmod, changefreq, priority }: KCDSitemapEntry) {
    return `
<url>
  <loc>${domainUrl.protocol}://${domainUrl.host}${route}</loc>
  ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
  ${priority ? `<priority>${priority}</priority>` : ""}
</url>
  `.trim();
  }

  function getEntrySubdomains({
    route,
    lastmod,
    changefreq,
    priority,
  }: KCDSitemapEntry) {
    return `
<url>
  <loc>${domainUrl.protocol}://${route}.${domainUrl.host}</loc>
  ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
  ${priority ? `<priority>${priority}</priority>` : ""}
</url>
  `.trim();
  }

  function getEntrySubdomainsPosts({
    route,
    postHandle,
    lastmod,
    changefreq,
    priority,
  }: KCDSitemapEntry & { postHandle: string }) {
    return `
<url>
  <loc>${domainUrl.protocol}://${route}.${domainUrl.host}/${postHandle}</loc>
  ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
  ${priority ? `<priority>${priority}</priority>` : ""}
</url>
  `.trim();
  }

  const rawSitemapEntries = (
    await Promise.all(
      Object.entries(remixContext.routeModules).map(async ([id, mod]) => {
        const handle = mod.handle as KCDHandle | undefined;
        if (handle?.getSitemapEntries) {
          return handle.getSitemapEntries(request);
        }
        if (allowedRoutes.includes(id) === false) return;
        if (!("default" in mod))
          // exclude resource routes from the sitemap
          // (these are an opt-in via the getSitemapEntries method)
          return;

        const manifestEntry = remixContext.manifest.routes[id];
        if (!manifestEntry) {
          console.warn(`Could not find a manifest entry for ${id}`);
          return;
        }
        let parentId = manifestEntry.parentId;
        let parent = parentId ? remixContext.manifest.routes[parentId] : null;

        let path;
        // if (id.startsWith("routes/_")) {
        //   console.log(id);
        //   console.log(manifestEntry);
        // }
        if (manifestEntry.path) {
          path = removeTrailingSlash(manifestEntry.path);
        } else if (manifestEntry.index) {
          path = "";
        } else {
          return;
        }

        while (parent) {
          // the root path is '/', so it messes things up if we add another '/'
          const parentPath = parent.path
            ? removeTrailingSlash(parent.path)
            : "";
          path = `${parentPath}/${path}`;
          parentId = parent.parentId;
          parent = parentId ? remixContext.manifest.routes[parentId] : null;
        }

        // we can't handle dynamic routes, so if the handle doesn't have a
        // getSitemapEntries function, we just
        if (path.includes(":")) return;
        if (id === "root") return;

        const entry: KCDSitemapEntry = {
          route: removeTrailingSlash(path).replace("//", "/"),
          lastmod: dayjs().format("YYYY-MM-DD"),
        };
        return entry;
      })
    )
  )
    .flatMap((z) => z)
    .filter(typedBoolean);

  const sitemapEntries: Array<KCDSitemapEntry> = [];
  const allowedSitemapEntries: Array<KCDSitemapEntry> = [];
  const postSiteMapEntries: Array<KCDSitemapEntry & { postHandle: string }> =
    [];

  for (const entry of rawSitemapEntries) {
    const existingEntryForRoute = allowedSitemapEntries.find(
      (e) => e.route === entry.route
    );
    if (existingEntryForRoute) {
      if (!isEqual(existingEntryForRoute, entry)) {
        console.warn(
          `Duplicate route for ${entry.route} with different sitemap data`,
          { entry, existingEntryForRoute }
        );
      }
    } else {
      allowedSitemapEntries.push(entry);
    }
  }

  const stores = await sdk.GetAllStoresForSiteMap();
  const posts = await sdk.GetAllPublishedPostForSiteMap();

  if (stores.getAllStoresForSiteMap) {
    const siteMapStores: KCDSitemapEntry[] = stores.getAllStoresForSiteMap?.map(
      ({ subdomain }) => ({
        route: `${subdomain}`,
        changefreq: "daily",
      })
    );
    if (siteMapStores !== undefined) {
      sitemapEntries.push(...siteMapStores);
    }
  }
  if (posts.getAllPublishedPostForSiteMap) {
    const siteMapStores = posts.getAllPublishedPostForSiteMap?.map(
      ({ postHandle, store, publishedDate }) => ({
        route: `${store?.subdomain}`,
        postHandle: postHandle ?? "",
        lastmod: publishedDate,
        changefreq: "monthly",
      })
    );
    if (siteMapStores !== undefined) {
      postSiteMapEntries.push(...siteMapStores);
    }
  }

  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  ${allowedSitemapEntries.map((entry) => getEntry(entry)).join("")}
  ${sitemapEntries.map((entry) => getEntrySubdomains(entry)).join("")}
  ${postSiteMapEntries.map((entry) => getEntrySubdomainsPosts(entry)).join("")}
</urlset>
  `.trim();
}

export { getSitemapXml };
