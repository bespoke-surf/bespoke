import { Await, Link, useLoaderData } from "@remix-run/react";
import type { IconButtonProps } from "gestalt";
import {
  Box,
  Button,
  ButtonGroup,
  Datapoint,
  Flex,
  Heading,
  IconButton,
  Text,
} from "gestalt";
import React from "react";
import type {
  GetListCountQuery,
  GetPostCountQuery,
  GetSubscribersCountQuery,
  GetTotalFormSubmitRateQuery,
  GetTotalSubmittedFormQuery,
  GetWorkflowCountQuery,
} from "../../graphql/__generated__/graphql";

import type { ToolsLoaderData } from "./types";

export interface Pages {
  id: string;
  title: string;
  href: string;
  description: string;
  icon: IconButtonProps["icon"];
}

export const Boxes = ({ data }: { data: Pages | undefined }) => {
  const {
    workflowCountPromise,
    submittedFormPromise,
    formSubmitRatePromise,
    postCountPromise,
    subscriberCountPromise,
    listCountPromise,
  } = useLoaderData() as ToolsLoaderData;

  return (
    <Box rounding={4} borderStyle="sm" padding={6}>
      <Flex justifyContent="between" alignItems="center" gap={2}>
        <Flex.Item flex="grow">
          <Flex flex="grow" gap={{ row: 0, column: 6 }} direction="column">
            <Heading size="400">{data?.title}</Heading>
            {data?.id === "WORKFLOW" && (
              <Flex gap={{ column: 2, row: 8 }} wrap>
                <React.Suspense
                  fallback={<Datapoint title="All Workflows" value="-" />}
                >
                  <Await
                    resolve={workflowCountPromise}
                    errorElement={
                      <Text color="error">something bad happend here</Text>
                    }
                  >
                    {(workflowCount: GetWorkflowCountQuery) => (
                      <Datapoint
                        title="All Workflows"
                        value={`${
                          workflowCount.getWorkflowCount
                            ? workflowCount.getWorkflowCount
                            : "-"
                        }`}
                      />
                    )}
                  </Await>
                </React.Suspense>
              </Flex>
            )}
            {data?.id === "FORM" && (
              <Flex gap={{ column: 2, row: 8 }} wrap>
                <React.Suspense
                  fallback={<Datapoint title="Submitted Form" value="-" />}
                >
                  <Await
                    resolve={submittedFormPromise}
                    errorElement={
                      <Text color="error">something bad happend here</Text>
                    }
                  >
                    {(submittedForm: GetTotalSubmittedFormQuery) => (
                      <Datapoint
                        title="Submitted Form"
                        value={`${
                          submittedForm.getTotalSubmittedForm
                            ? submittedForm.getTotalSubmittedForm
                            : "-"
                        }`}
                      />
                    )}
                  </Await>
                </React.Suspense>
                <React.Suspense
                  fallback={<Datapoint title="Form Submit Rate" value="-" />}
                >
                  <Await
                    resolve={formSubmitRatePromise}
                    errorElement={
                      <Text color="error">something bad happend here</Text>
                    }
                  >
                    {(data: GetTotalFormSubmitRateQuery) => (
                      <Datapoint
                        title="Form Submit Rate"
                        value={`${
                          data.getTotalFormSubmitRate
                            ? `${data.getTotalFormSubmitRate}%`
                            : "-"
                        }`}
                      />
                    )}
                  </Await>
                </React.Suspense>
              </Flex>
            )}
            {data?.id === "NEWSLETTER" && (
              <Flex gap={{ column: 2, row: 8 }} wrap>
                <React.Suspense
                  fallback={<Datapoint title="All Posts" value="-" />}
                >
                  <Await
                    resolve={postCountPromise}
                    errorElement={
                      <Text color="error">something bad happend here</Text>
                    }
                  >
                    {(data: GetPostCountQuery) => (
                      <Datapoint
                        title="Posts & Drafts"
                        value={`${data.getPostCount ? data.getPostCount : "-"}`}
                      />
                    )}
                  </Await>
                </React.Suspense>
              </Flex>
            )}
            {data?.id === "LISTS" && (
              <Flex gap={{ column: 2, row: 8 }} wrap>
                <React.Suspense
                  fallback={<Datapoint title="Subscribers" value="-" />}
                >
                  <Await
                    resolve={subscriberCountPromise}
                    errorElement={
                      <Text color="error">something bad happend here</Text>
                    }
                  >
                    {(data: GetSubscribersCountQuery) => (
                      <Datapoint
                        title="Subscribers"
                        value={`${
                          data.getSubscribersCount
                            ? data.getSubscribersCount
                            : "-"
                        }`}
                      />
                    )}
                  </Await>
                </React.Suspense>
                <React.Suspense
                  fallback={<Datapoint title="All Lists" value="-" />}
                >
                  <Await
                    resolve={listCountPromise}
                    errorElement={
                      <Text color="error">something bad happend here</Text>
                    }
                  >
                    {(data: GetListCountQuery) => (
                      <Datapoint
                        title="All Lists"
                        value={`${data.getListCount ? data.getListCount : "-"}`}
                      />
                    )}
                  </Await>
                </React.Suspense>
              </Flex>
            )}
          </Flex>
        </Flex.Item>

        <Link to={data?.href ?? ""} prefetch="intent">
          <IconButton
            accessibilityLabel="forward"
            icon="arrow-forward"
            role="button"
            size="md"
          />
        </Link>
      </Flex>
      {data?.id === "NEWSLETTER" && (
        <Flex justifyContent="end">
          <ButtonGroup>
            <Button
              href="/tools/public-profile"
              role="link"
              text="Public Website"
              color="white"
              size="lg"
            />
            <Button
              text="About Page"
              color="gray"
              size="lg"
              href="/about"
              role="link"
            />
          </ButtonGroup>
        </Flex>
      )}
    </Box>
  );
};
