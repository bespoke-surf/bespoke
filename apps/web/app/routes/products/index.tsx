import type {
  ActionArgs,
  HeadersFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  Box,
  Button,
  Callout,
  Container,
  Datapoint,
  Dropdown,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Mask,
  Masonry,
  PageHeader,
  Spinner,
  Text,
} from "gestalt";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ClientOnly } from "remix-utils";
import type { ProductFragment } from "~/graphql/__generated__/graphql";
import { sdk } from "~/graphql/graphqlWrapper.server";
import type { RootData } from "~/root";
import { getImageSrcAndSrcSet } from "~/utils/getCloudinarySrcAndSrcSet";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import type { ProductData } from "./types";
import { ProductActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "cache-control": loaderHeaders.get("cache-control") ?? "no-store",
  };
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  const title = `Products | ${rootData.store?.name}`;
  const description = rootData.isUserSubdomain
    ? "Products sold from your store. You can also add products on posts you create."
    : `Products sold by ${rootData.store?.name}.`;

  return {
    title,
    description,
    "og:title": title,
    "og:description": description,
    "twitter:title": title,
    "twitter:description": description,
  };
};

export async function loader({ request }: LoaderArgs) {
  const subdomain = getSubdomain(request);

  let take = 24;

  const skipExist = new URL(request.url).searchParams.get("skip");
  const skip = skipExist ? Number(skipExist) : 0;

  const isPrivate = await isPrivateRoute(request, true);

  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetProducts({
      subdomain,
      skip,
      take,
    }),
    sdk.GetProductCount({
      subdomain,
    }),
  ]);

  const products = response[0];
  const count = response[1];

  return json<ProductData>(
    {
      products: products.getProducts,
      productCount: count.getProductCount,
    },
    {
      headers: {
        "cache-control":
          isPrivate == false
            ? "public, s-maxage=60, stale-while-revalidate=604800, stale-if-error=86400"
            : "private, max-age=10",
      },
    }
  );
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action") as string;

  if (action === ProductActionEnum.createProductPost) {
    const postId = formData.get("postId") as string;
    const productIds = formData.get("productIds") as string;
    const nodeKey = formData.get("nodeKey") as string;
    const arrayOfProductIds = JSON.parse(productIds) as string[];
    await sdk.CreateProductPost(
      {
        postId,
        productIds: arrayOfProductIds,
        nodeKey,
      },
      { request }
    );
  }
  if (action === ProductActionEnum.deleteProductPost) {
    const postId = formData.get("postId") as string;
    const nodeKey = formData.get("nodeKey") as string;
    await sdk.DeleteProductPost(
      {
        postId,
        nodeKey,
      },
      { request }
    );
  }
  if (action === ProductActionEnum.deleteProduct) {
    const productId = formData.get("productId") as string;
    await sdk.DeleteProduct(
      {
        productId,
      },
      { request }
    );
    return json({
      productId,
    });
  }
  return null;
}

export default function Products() {
  const loaderData = useLoaderData<ProductData>();
  const rootData = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher<ProductData>();
  const actionData = useActionData<{ productId: string }>();

  const navigate = useNavigate();

  const transition = useTransition();
  const [products, setProducts] = useState<
    ProductFragment[] | null | undefined
  >(loaderData.products);

  const loading =
    transition.state === "loading" || transition.state === "submitting";

  useEffect(() => {
    if (fetcher.type === "init") {
      setProducts(loaderData.products);
    }
  }, [fetcher.type, loaderData.products]);

  useEffect(() => {
    if (
      actionData?.productId &&
      products?.some(({ id }) => id === actionData.productId)
    ) {
      const p = products?.filter(({ id }) => id !== actionData.productId);
      setProducts(p);
    }
  }, [actionData?.productId, products]);

  useEffect(() => {
    if (fetcher.data) {
      setProducts((prevProd) => {
        if (prevProd && fetcher.data?.products) {
          return [...prevProd, ...fetcher.data?.products];
        }
        return null;
      });
    }
  }, [fetcher.data]);

  const handleLoadMore = useCallback(
    (_arg?: { from: number }) => {
      if (loaderData.productCount !== _arg?.from) {
        fetcher.load(`/products/?skip=${products?.length}`);
        return true;
      }
      return false;
    },
    [fetcher, loaderData.productCount, products?.length]
  );

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              borderStyle="none"
              title="PRODUCTS"
              items={[
                <Datapoint
                  key="revenue"
                  size="md"
                  title="All products"
                  value={`${loaderData.productCount}` ?? "0"}
                />,
              ]}
              primaryAction={
                rootData?.isUserSubdomain
                  ? {
                      component: (
                        <Button
                          color="red"
                          size="lg"
                          text="Add"
                          href="/products/add-product"
                          role="link"
                        />
                      ),
                      dropdownItems: [
                        <Dropdown.Item
                          onSelect={() => navigate("/products/add-product")}
                          key="add-prodcut"
                          option={{ label: "Add", value: "add" }}
                        />,
                      ],
                    }
                  : undefined
              }
            />
            <Flex justifyContent="center">
              <Box paddingY={6} width="92.5%">
                {loaderData.products?.length === 0 && (
                  <Callout
                    iconAccessibilityLabel="products"
                    message="You can insert upto 3 products in a row in your newsletter post."
                    type="info"
                    title="Insert Products in Newsletter"
                    // primaryAction={
                    //   rootData?.isUserSubdomain
                    //     ? {
                    //         href: "/products/add-product",
                    //         accessibilityLabel: "add product",
                    //         label: "Add",
                    //         target: "self",
                    //       }
                    //     : undefined
                    // }
                    // secondaryAction={
                    //   rootData.isUserSubdomain
                    //     ? {
                    //         label: "Sync Products",
                    //         accessibilityLabel: "sync",
                    //         href: "/integrations",
                    //         target: "self",
                    //       }
                    //     : undefined
                    // }
                  />
                )}
                <ClientOnly>
                  {() => (
                    <Masonry
                      renderItem={({ data }) => <Product data={data} />}
                      items={products ?? []}
                      minCols={2}
                      gutterWidth={4}
                      layout="flexible"
                      loadItems={handleLoadMore}
                      scrollContainer={() => window as any}
                      virtualize
                    />
                  )}
                </ClientOnly>
                {loading && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    marginBottom={12}
                    marginTop={8}
                  >
                    <Spinner accessibilityLabel="loading" show />
                  </Box>
                )}
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
      <Outlet />
    </BigContainer>
  );
}

const Product = ({ data }: { data: ProductFragment }) => {
  const rootData = useRouteLoaderData("root") as RootData;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const submit = useSubmit();

  const srcString = useMemo(
    () =>
      getImageSrcAndSrcSet(
        data.image?.[0]?.src,
        false,
        data.image?.[0]?.cdnType
      ),
    [data.image]
  );

  const handleDeleteProduct = useCallback(() => {
    const formData = new FormData();
    formData.append("_action", ProductActionEnum.deleteProduct);
    formData.append("productId", data.id);
    submit(formData, { method: "post" });
    setOpen(false);
  }, [data.id, submit]);

  if (!srcString) return null;

  return (
    <Box>
      <Link target="blank" href={data.externalLink ?? ""}>
        <Mask wash rounding={5}>
          <Image
            role="img"
            alt="prduct image"
            color="lightGray"
            naturalHeight={data.image?.[0]?.height ?? 1}
            naturalWidth={data.image?.[0]?.width ?? 1}
            loading="eager"
            src={srcString?.src}
            srcSet={srcString?.srcSet}
            sizes={srcString?.sizes}
          >
            <Box height="100%" padding={3}>
              <Flex
                direction="column"
                alignItems="end"
                height="100%"
                justifyContent="start"
              >
                <Box rounding="pill" color="light" padding={2}>
                  <Icon
                    icon="arrow-up-right"
                    accessibilityLabel="arrow-up-right"
                    color="dark"
                    size={10}
                  />
                </Box>
              </Flex>
            </Box>
          </Image>
        </Mask>
      </Link>
      <Box
        padding={2}
        display="flex"
        direction="row"
        justifyContent="between"
        alignItems="start"
      >
        <Flex direction="column" gap={1}>
          <Text weight="bold" size="200">
            {getSymbolFromCurrency(rootData?.store?.currency ?? "")}
            {data.price / 100}
            {(data.price / 100) % 1 === 0 ? ".00" : null}
          </Text>
          <Text lineClamp={2} weight="bold" size="200">
            {data.name}
          </Text>
          <Text size="200" color="subtle">
            {rootData?.store?.name}
          </Text>
        </Flex>
        {rootData?.isUserSubdomain && (
          <>
            <IconButton
              accessibilityLabel="elipsis"
              icon="ellipsis"
              size="xs"
              ref={anchorRef}
              onClick={() => setOpen(true)}
            />
            {open && (
              <Dropdown
                anchor={anchorRef.current}
                id="delete product"
                onDismiss={() => setOpen(false)}
              >
                <Dropdown.Item
                  onSelect={handleDeleteProduct}
                  option={{ value: "Delete", label: "Delete" }}
                />
              </Dropdown>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
