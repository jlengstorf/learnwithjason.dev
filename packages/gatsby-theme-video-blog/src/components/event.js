/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useEffect, useState } from 'react';
import Image from 'gatsby-image';
import SEO from './seo';

const Event = ({ title, slug, date, description, guest, image }) => {
  const [calendarLink, setCalendarLink] = useState(false);

  if (guest === null) {
    guest = [];
  }

  useEffect(() => {
    const startTS = Date.parse(date); // get a Unix timestamp (milliseconds)
    const endTS = startTS + 1000 * 60 * 90; // add 90 minutes
    const start = new Date(startTS)
      .toISOString()
      .replace('.000', '')
      .replace(/\W/g, '');
    const end = new Date(endTS)
      .toISOString()
      .replace('.000', '')
      .replace(/\W/g, '');
    const link = new URL('https://www.google.com/calendar/render');
    link.searchParams.set('action', 'TEMPLATE');
    link.searchParams.set('text', title);
    link.searchParams.set('details', description);
    link.searchParams.set('location', 'https://twitch.tv/jlengstorf');
    link.searchParams.set('dates', `${start}/${end}`);
    link.searchParams.set('ctz', `America/Los_Angeles`);

    setCalendarLink(link.toString());
  }, [date, title, description]);

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
    <article
      sx={{
        mt: 5,
        variant: 'video-blog.video',
      }}
    >
      <SEO
        title={`${title} (with ${guest.map(g => g.name).join()})`}
        description={description}
        image={image.fluid.src}
        author={{ twitter: '@LWJShow' }}
        path={`/${slug}`}
      />
      <h1 sx={{ fontSize: 4 }}>
        {title} (with {guest.map(g => g.name).join()})
      </h1>

      <p>
        <strong>Watch this episode live! {localeDate}.</strong>
      </p>

      {calendarLink && (
        <a href={calendarLink} sx={{ variant: 'button' }} target="_blank">
          Add to Google Calendar
        </a>
      )}

      <Image fluid={image.fluid} alt={title} />

      <p>{description}</p>

      <ul>
        {guest.length > 0 && (
          <li>
            <strong>Guest{guest.length > 1 ? 's' : ''}:</strong>{' '}
            {guest.map(({ name, twitter }) => (
              <a key={twitter} href={`https://twitter.com/${twitter}`}>
                {name}
              </a>
            ))}
          </li>
        )}
      </ul>
    </article>
  );
};

export default Event;
