import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Organization JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/organization/organization');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Organization', '1.1.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/organization/organization');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@id': 'https://www.purpule-fox.io/#corporation',
        '@type': 'Corporation',
        name: 'Purple Fox',
        legalName: 'Purple Fox LLC',
        logo: 'https://www.example.com/photos/logo.jpg',
        url: 'https://www.purpule-fox.io/',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1600 Saratoga Ave',
          addressLocality: 'San Jose',
          addressRegion: 'CA',
          postalCode: '95129',
          addressCountry: 'US',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+1-877-746-0909',
            areaServed: 'US',
            availableLanguage: ['English', 'Spanish', 'French'],
            contactOption: 'TollFree',
          },
        ],
        sameAs: ['https://www.orange-fox.com'],
      });
    });
  });

  it('renders with multiple addresses', () => {
    cy.visit('http://localhost:3000/jsonld/organization/multipleAddresses');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@id': 'https://www.purpule-fox.io/#corporation-multiple-addresses',
        '@type': 'Corporation',
        name: 'Purple Fox',
        legalName: 'Purple Fox LLC',
        logo: 'https://www.example.com/photos/logo.jpg',
        url: 'https://www.purpule-fox.io/',
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: '1600 Saratoga Ave',
            addressLocality: 'San Jose',
            addressRegion: 'CA',
            postalCode: '95129',
            addressCountry: 'US',
          },
          {
            '@type': 'PostalAddress',
            streetAddress: '17 street address',
            addressLocality: 'Paris',
            addressRegion: 'Ile-de-France',
            postalCode: '75001',
            addressCountry: 'France',
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+1-877-746-0909',
            areaServed: 'US',
            availableLanguage: ['English', 'Spanish', 'French'],
            contactOption: 'TollFree',
          },
        ],
        sameAs: ['https://www.orange-fox.com'],
      });
    });
  });
});
