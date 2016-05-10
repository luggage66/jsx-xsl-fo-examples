/** @jsx XSLFO.createElement */
import XSLFO, { Component } from 'jsx-xsl-fo';
import { Report, PageSequence, PageContent, PageHeader } from 'jsx-xsl-fo/reporting';

const styles = {
    document: {
        fontFamily: 'serif'
    },
    title: {
        fontSize: '30pt'
    }
};

//define components as functions
function Title(props) {
    return <block {...styles.title}>{props.children}</block>;
}

// or as ES6 classes
class AddressBlock extends Component {
    render() {
        return <block margin-bottom="1em" keep-together-within-page="always">
            <block>{this.props.lastName}, {this.props.firstName}</block>
            <block>{this.props.streetAddress}</block>
            <block>{this.props.city}, {this.props.state} {this.props.zipCode}</block>
        </block>;
    }
}

// Main report function
function generateReport(data) {
    return <Report {...styles.document}>
        <PageSequence>
            <PageHeader>
                <block text-align="end">Page <pageNumber /></block>
            </PageHeader>
            <PageContent>
                <Title>Contacts!</Title>
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
        state: faker.address.state(),
        zipCode: faker.address.zipCode()
    }))
};

export default generateReport(data);
