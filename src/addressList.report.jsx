/** @jsx XSLFO.createElement */
import XSLFO, { Component } from 'jsx-xsl-fo';
import { Report, PageSequence, PageContent, PageHeader } from 'jsx-xsl-fo/reporting';
import faker from 'faker';

let data = (new Array(100).fill()).map(() => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        streetAddress: faker.address.streetAddress()
    };
});

//console.log(data);

class AddressBlock extends Component {
    render() {
        return <block>{this.props.firstName} {this.props.streetAddress}</block>;
    }
}

export default function generateReport(/* data */) {
    return <Report>
        <PageSequence>
            <PageContent>
                {data.map(contact => {
                    return <AddressBlock {...contact} />;
                })}
            </PageContent>
        </PageSequence>
    </Report>;
}
