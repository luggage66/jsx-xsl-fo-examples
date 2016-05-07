/** @jsx XSLFO.createElement */
import XSLFO, { Component } from 'jsx-xsl-fo';
import { Report, PageSequence, PageContent, PageHeader } from 'jsx-xsl-fo/reporting';

//make simple react-like components
class TitleBar extends Component {
    render() {
        return <block font-size="30pt">{this.children}</block>;
    }
}

export default function generateReport(data) {
    return <Report>
        <PageSequence>
            <PageContent>
                <TitleBar>A Title!</TitleBar>
            </PageContent>
        </PageSequence>
        <PageSequence>
            <PageHeader height="1.2em">
                <block lineHeight="14pt" fontSize="10pt" textAlign="end">
                    Page <pageNumber />
                </block>
            </PageHeader>
            <PageContent>
                <block>
                    Names:
                    {data.names.map(name => {
                        return <inline font-style="italic">{name}</inline>;
                    })}
                </block>
            </PageContent>
        </PageSequence>
    </Report>;
}
