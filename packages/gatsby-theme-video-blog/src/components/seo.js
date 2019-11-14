import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, path, image, author, date = false }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          baseUrl
        }
      }
    }
  `);

  const defaults = data.site.siteMetadata;

  if (defaults.baseUrl === '' && typeof window !== 'undefined') {
    defaults.baseUrl = window.location.origin;
  }

  if (defaults.baseUrl === '') {
    console.error('Please set a baseUrl in your site metadata!');
    return null;
  }

  const startTS = Date.parse(date); // get a Unix timestamp (milliseconds)
  const endTS = startTS + 1000 * 60 * 90; // add 90 minutes

  const seo = {
    title: title || defaults.title,
    description: description || defaults.description,
    url: new URL(path || '', defaults.baseUrl),
    image: image ? new URL(image, defaults.baseUrl) : false,
    startDate: new Date(startTS).toISOString(),
    endDate: new Date(endTS).toISOString(),
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <link rel="canonical" href={seo.url} />
      <meta name="description" content={seo.description} />
      {seo.image && <meta name="image" content={seo.image} />}

      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author.twitter} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {date && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Event',
            name: seo.title,
            url: seo.url,
            description: seo.description,
            startDate: seo.startDate,
            endDate: seo.endDate,
            organizer: {
              '@type': 'Organization',
              name: 'Learn With Jason',
              url: 'https://learnwithjason.dev/',
            },
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
