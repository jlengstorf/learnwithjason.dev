import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Event from '../components/event';

export const query = graphql`
  query($slug: String) {
    videoEpisode(slug: { eq: $slug }) {
      title
      slug
      date
      description
      guest {
        name
        twitter
      }
      image {
        fluid {
          ...GatsbySanityImageFluid_withWebp
        }
      }
    }
  }
`;

const EventTemplate = ({ data: { videoEpisode } }) => (
  <Layout>
    <Event {...videoEpisode} />
  </Layout>
);

export default EventTemplate;
