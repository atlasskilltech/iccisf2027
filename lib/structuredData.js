import { site } from "@/data/site";

/**
 * schema.org graph built ONLY from confirmed facts: name, dates, venue address,
 * organizer. Deliberately omitted until confirmed: eventAttendanceMode (in-person vs
 * hybrid), offers (fees), performers (speakers), sponsors, IEEE affiliation.
 */
export function buildStructuredData() {
  const orgId = `${site.url}/#organization`;
  const siteId = `${site.url}/#website`;
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.venue.street,
    addressLocality: `${site.venue.locality}, ${site.venue.city}`,
    addressRegion: site.venue.region,
    postalCode: site.venue.postalCode,
    addressCountry: site.venue.countryCode,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": orgId,
        name: site.host.name,
        url: site.host.website,
        logo: `${site.url}/logos/atlas-skilltech-logo.png`,
        address,
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: site.shortName,
        alternateName: site.name,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
      {
        "@type": "Event",
        "@id": `${site.url}/#event`,
        name: `${site.name} (${site.shortName})`,
        alternateName: site.shortName,
        description: site.seo.description,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        startDate: site.dates.start,
        endDate: site.dates.end,
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: site.venue.name,
          address,
        },
        organizer: { "@id": orgId },
      },
    ],
  };
}
