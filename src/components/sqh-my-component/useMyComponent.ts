import { useQuery } from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { MyComponent } from "./sqh-my-component";

/*
get the authed user's first and last name
*/

const GET_NAME = gql`
  query {
    viewer {
      ... on User {
        firstName
        lastName
        referrals {
          totalCount
        }
      }
    }
  }
`;

export function useMyComponent(props: MyComponent) {
  const { data, loading } = useQuery(GET_NAME, {});
  return {
    states: {
      loading,
      content: props,
    },
    data: {
      firstName: data?.viewer?.firstName,
      lastName: data?.viewer?.lastName,
      referralCount: data?.viewer?.referrals?.totalCount,
    },
    callbacks: {},
  };
}
