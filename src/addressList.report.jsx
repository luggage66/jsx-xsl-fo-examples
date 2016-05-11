/** @jsx XSLFO.createElement */
import XSLFO, { Component } from 'jsx-xsl-fo';
import { Report, PageSequence, PageContent, PageHeader, PageFooter } from 'jsx-xsl-fo/reporting';

const styles = {
    document: {
        fontFamily: 'serif'
    },
    title: {
        fontSize: '30pt',
        borderBottom: "0.75pt solid black"
    }
};

// define components as functions.
function AddressBlock(props) {
    return <block space-before="1em" keep-together-within-page="always">
        <block fontWeight="bold">{props.lastName}, {props.firstName}</block>
        <block>{props.streetAddress}</block>
        <block>{props.city}, {props.state} {props.zipCode}</block>
    </block>;
}

// Main report function.
// We use a couple of the helper components that deal with some XSL-FO structures.
function generateReport(data) {
    return <Report {...styles.document}>
        <PageSequence>
            <PageHeader>
                <block textAlign="end">Page <pageNumber /></block>
            </PageHeader>
            <PageContent>
                <block {...styles.title}>Contacts</block>
                {data.contacts.map(contact => <AddressBlock {...contact} />)}
            </PageContent>
        </PageSequence>
    </Report>;
}

// Make some Test Data
import faker from 'faker';
let data = {
    // make some fake contacts
    contacts: (new Array(100).fill()).map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        streetAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zipCode: faker.address.zipCode()
    }))
};

export default generateReport(data);
