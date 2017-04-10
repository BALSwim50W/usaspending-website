/**
 * BudgetProcess.jsx
 * Created by Rickey An 04/03/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';


export default class WhatsNext extends React.Component {

    render() {
        return (
            <div className="whatsnext-wrap">
                <div className="whatsnext-inner-wrap">
                    <div className="img-placeholder"></div>
                    <h3>What&#8217;s Next</h3>
                    <hr className="results-divider" />
                    <p>What&#8217;s Next. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet risus sed urna cursus mollis. Donec sagittis nunc pretium dui congue, id gravida purus lobortis. Nunc sed varius massa. Nam blandit cursus metus a maximus. Vivamus pretium augue sed est aliquam mollis. Mauris efficitur arcu vitae venenatis sodales.</p>
                    <a href="#">
                        <button
                            className="usa-button-primary"
                            title="View FAQs"
                            aria-label="View FAQs">
                            What&#8217;s Next
                        </button>
                    </a>
                </div>
            </div>

        );
    }
}
 