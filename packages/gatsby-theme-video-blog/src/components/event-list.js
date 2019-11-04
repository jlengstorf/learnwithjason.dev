/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const Event = ({ title, description, date, image, basePath, slug }) => {
  const localeDate = new Date(date).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

  return (
    <div
      sx={{
        display: ['block', 'grid'],
        gridTemplateColumns: '3fr 2fr',
        columnGap: 4,
        m: 0,
        mt: 4,
      }}
    >
      <p
        sx={{
          m: 0,
          mb: 2,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          letterSpacing: 'caps',
          gridColumn: '1 / 3',
        }}
      >
        {localeDate}
      </p>
      <div>
        <Link to={`/${basePath}/${slug}/`}>
          <Image fluid={image.fluid} alt={title} />
        </Link>
      </div>
      <div>
        <h2 sx={{ m: 0, mt: [3, 0] }}>
          <Link to={`/${basePath}/${slug}/`}>{title}</Link>
        </h2>
        <p sx={{ m: 0, mt: 2 }}>{description}</p>
        <p sx={{ m: 0, mt: 2 }}>
          <Link to={`/${basePath}/${slug}/`}>View details &rarr;</Link>
        </p>
      </div>
    </div>
  );
};

const EventList = ({ videos, basePath }) => {
  return (
    <div>
      {videos.map(video => (
        <Event
          key={video.id}
          title={video.title}
          description={video.description}
          date={video.date}
          image={video.image}
          slug={video.slug}
          basePath={basePath}
        />
      ))}
    </div>
  );
};

export default EventList;
