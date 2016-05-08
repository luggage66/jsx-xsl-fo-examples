/** @jsx XSLFO.createElement */
import XSLFO, { Component } from 'jsx-xsl-fo';
import { Report, PageSequence, PageContent, PageHeader } from 'jsx-xsl-fo/reporting';

function TableOfContentsItem(props) {
    return <block text-align-last="justify">
        <basicLink internal-destination={props.sectionId}>
            {props.sectionTitle}
            <leader leader-pattern="dots" />
            <pageNumberCitation ref-id={props.sectionId} />
        </basicLink>
    </block>;
}

export default function generateReport(data) {
    return <Report>
        <PageSequence>
            <PageContent>
                <TitleBar>A Title</TitleBar>
                <TableOfContentsItem sectionId="section1" sectionTitle="One" />
                <TableOfContentsItem sectionId="section1" sectionTitle="Two" />
            </PageContent>
        </PageSequence>
        <PageSequence>
            <PageHeader height="1.2em">
                <block lineHeight="14pt" fontSize="10pt" textAlign="end">
                    Page <pageNumber />
                </block>
            </PageHeader>
            <PageContent>
                <block id="section1">
                    Names:
                    {data.names.map(name => {
                        return <inline fontStyle="italic">{name}, </inline>;
                    })}
                </block>
            </PageContent>
        </PageSequence>
    </Report>;
}

//make simple react-like components
class TitleBar extends Component {
    render() {
        return <block fontSize="30pt">{this.children}</block>;
    }
}
