import { Stack, Flex, Box, Link, Heading, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 50,
    },
  });
  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
      </div>
    );
  }
  return (
    <Layout>
      <Stack spacing={8}>
        {data!.posts.map((p) =>
          !p ? null : (
            <Flex key={p.id} p={5} shadow='md' borderWidth='1px'>
              *
              <Box flex={1}>
                <NextLink href='/post/[id]' as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize='xl'>{p.title}</Heading>
                  </Link>
                </NextLink>
                <Flex align='center'>
                  <Text flex={1} mt={4}>
                    {p.text}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          )
        )}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
